import { Injectable, NotFoundException, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as XLSX from 'xlsx';
import { Itinerary } from './../../../database/entities/itinerary.entity';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { BulkUpdateItineraryDto, UpdateItineraryWithCodeDto } from './dto/update-itinerary-excel.dto';
import axios from 'axios';

@Injectable()
export class ItineraryService {
  private readonly logger = new Logger(ItineraryService.name);

  constructor(
    @InjectRepository(Itinerary)
    private readonly itineraryRepository: Repository<Itinerary>,
    private readonly dataSource: DataSource,
  ) {}

  // ---------- EXISTENTES ----------
  async findAll(): Promise<Itinerary[]> {
    return this.itineraryRepository.find({ where: { is_active: true } });
  }

  async findOne(code: string): Promise<Itinerary> {
    const result = await this.itineraryRepository.findOne({ where: { code: code.trim(), is_active: true } });
    if (!result) throw new NotFoundException(`Itinerary with code ${code} not found`);
    return result;
  }

  async update(code: string, updateDto: UpdateItineraryDto): Promise<Itinerary> {
    try {
      const oldItinerary = await this.itineraryRepository.findOneBy({ code: code.trim(), is_active: true });
      if (!oldItinerary) throw new NotFoundException(`Itinerary with code ${code} not found`);

      await this.itineraryRepository.update({ code: code.trim(), is_active: true }, { is_active: false });

      const newItinerary = this.itineraryRepository.create({
        ...oldItinerary,
        start_time: updateDto.start_time,
        end_time: updateDto.end_time,
        route: updateDto.route,
        km_traveled: updateDto.km_traveled ? Number(updateDto.km_traveled) : 0,
        shift_id: Number(updateDto.shift_id),
        effective_date: new Date(),
        is_active: true,
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
      });

      return await this.itineraryRepository.save(newItinerary);
    } catch (error) {
      this.logger.error(`❌ Error actualizando itinerario con código ${code}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al actualizar el itinerario');
    }
  }

  // ---------- MASIVO (RESET POR GRUPO) ----------
  async bulkUpdate(bulkDto: BulkUpdateItineraryDto): Promise<{ updated: number; items: Itinerary[] }> {
    if (!bulkDto?.itineraries?.length) {
      throw new BadRequestException('No se recibieron itinerarios para actualizar');
    }

    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try {
      const repo = qr.manager.getRepository(Itinerary);
      const results: Itinerary[] = [];

      // 🔹 Agrupar itinerarios por "Itinerario" (ej: L1, L10, etc.) con trim
      const byGroup = bulkDto.itineraries.reduce<Record<string, UpdateItineraryWithCodeDto[]>>((acc, dto) => {
        const groupKey = dto.itinerary.trim(); 
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(dto);
        return acc;
      }, {});

      // 🔹 Procesar cada grupo
      for (const [itineraryCode, dtos] of Object.entries(byGroup)) {
        const cleanCode = itineraryCode.trim();
        // Desactivar todos los anteriores de este itinerario
        await repo.update({ itinerary: cleanCode, is_active: true }, { is_active: false });

        // Insertar los nuevos
        for (const dto of dtos) {
          const newItinerary = repo.create({
            code: dto.code.trim(),
            start_time: dto.start_time,
            end_time: dto.end_time,
            route: dto.route,
            km_traveled: dto.km_traveled ? Number(dto.km_traveled) : 0,
            shift_id: Number(dto.shift_id),
            itinerary: cleanCode,
            effective_date: new Date(),
            is_active: true,
          });
          results.push(await repo.save(newItinerary));
        }
      }

      await qr.commitTransaction();
      return { updated: results.length, items: results };
    } catch (error) {
      await qr.rollbackTransaction();
      this.logger.error(`❌ Error en bulkUpdate: ${error.message}`, error.stack);
      throw new InternalServerErrorException(`Error en actualización masiva: ${error.message}`);
    } finally {
      await qr.release();
    }
  }

  // ---------- IMPORTAR DESDE EXCEL ----------
  async importFromExcel(buffer: Buffer): Promise<{ updated: number; items: Itinerary[] }> {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    if (!sheetName) throw new BadRequestException('El Excel no tiene hojas');

    const sheet = workbook.Sheets[sheetName];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: '', raw: true });

    // Log de depuración para detectar posibles problemas con el código
    rows.forEach((r, i) => {
      this.logger.log(`Fila ${i + 1} - IdItinerario crudo: "${r['IdItinerario']}"`);
    });

    const required = [
      'IdItinerario',
      'Recorrido',
      'Hora despacho',
      'Hora fin',
      'Itinerario',
      'Km recorridos',
      'turno',
    ];

    const missingCols = required.filter((c) => !Object.keys(rows[0] || {}).includes(c));
    if (missingCols.length) {
      throw new BadRequestException(`Faltan columnas obligatorias en Excel: ${missingCols.join(', ')}`);
    }

    // 🔹 Tipamos la respuesta del endpoint shift
    interface Shift {
      id: number;
      shiftcode: string;
      route: string;
      chainpc: string;
      times: string;
      created_at: string;
      updated_at: string;
    }

    const shiftsResp = await axios.get<{ status: string; message: string; data: Shift[] }>(
      'https://ctucloja.com/api/shift',
    );
    const shifts: Shift[] = shiftsResp.data.data;

    // 🔹 Crear diccionario shiftcode -> id
    const shiftMap = new Map(shifts.map((s) => [s.shiftcode.trim(), s.id]));

    // Mapear columnas Excel -> DTO
    const toDto = (r: any): UpdateItineraryWithCodeDto => {
      const shiftcode = String(r['turno']).trim();
      const shiftId = shiftMap.get(shiftcode);

      if (!shiftId) {
        throw new BadRequestException(`Turno no encontrado: ${shiftcode}`);
      }

      return {
        code: String(r['IdItinerario']).trim(),
        start_time: String(r['Hora despacho']).trim(),
        end_time: String(r['Hora fin']).trim(),
        route: String(r['Recorrido']).trim(),
        km_traveled: r['Km recorridos']
          ? Number(String(r['Km recorridos']).replace(' KM', '').trim())
          : 0,
        shift_id: Number(shiftId),
        itinerary: String(r['Itinerario']).trim(),
      };
    };

    const itineraries = rows.map(toDto).filter((r) => r.code);

    // Llamamos a bulkUpdate con reset incluido
    return this.bulkUpdate({ itineraries });
  }

  // ---------- AGRUPAR POR LINEA ----------
  async findByLine(line: string): Promise<Record<string, Itinerary[]>> {
    const allItineraries = await this.itineraryRepository.find({ where: { is_active: true } });

    // Filtrar por código que termine exactamente con el sufijo
    const filtered = allItineraries.filter((it) => it.code.endsWith(line.trim()));
    const grouped: Record<string, Itinerary[]> = {};

    for (const item of filtered) {
      const groupKey = item.itinerary.trim();
      if (!grouped[groupKey]) grouped[groupKey] = [];
      grouped[groupKey].push(item);
    }

    for (const key in grouped) {
      grouped[key] = grouped[key].sort((a, b) => {
        // Extraer número al inicio del código, antes de la letra L
        const getNumber = (code: string) => {
          const match = code.match(/^(\d+)/);
          return match ? parseInt(match[1], 10) : 0;
        };
        return getNumber(a.code) - getNumber(b.code);
      });
    }

    return grouped;
  }
}

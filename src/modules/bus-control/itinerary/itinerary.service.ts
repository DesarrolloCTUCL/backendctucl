import { Injectable, NotFoundException, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as XLSX from 'xlsx';
import { Itinerary } from './../../../database/entities/itinerary.entity';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { BulkUpdateItineraryDto, UpdateItineraryWithCodeDto } from './dto/update-itinerary-excel.dto';

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
    const result = await this.itineraryRepository.findOne({ where: { code, is_active: true } });
    if (!result) throw new NotFoundException(`Itinerary with code ${code} not found`);
    return result;
  }

  async update(code: string, updateDto: UpdateItineraryDto): Promise<Itinerary> {
    try {
      const oldItinerary = await this.itineraryRepository.findOneBy({ code, is_active: true });
      if (!oldItinerary) throw new NotFoundException(`Itinerary with code ${code} not found`);

      await this.itineraryRepository.update({ code, is_active: true }, { is_active: false });

      const newItinerary = this.itineraryRepository.create({
        ...oldItinerary,
        start_time: updateDto.start_time,
        end_time: updateDto.end_time,
        route: updateDto.route,
        km_traveled: updateDto.km_traveled ? Number(updateDto.km_traveled) : 0, // <-- cambio
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

  // ---------- NUEVOS: REUSABLE + MASIVO ----------

  /**
   * Igual que update(), pero permitiendo inyectar un repositorio/manager para usar dentro de transacción.
   */
  private async updateSingle(
    code: string,
    updateDto: UpdateItineraryDto,
    repo: Repository<Itinerary>,
  ): Promise<Itinerary> {
    const oldItinerary = await repo.findOne({ where: { code, is_active: true } });
    if (!oldItinerary) throw new NotFoundException(`Itinerary with code ${code} not found`);

    await repo.update({ code, is_active: true }, { is_active: false });

    const newItinerary = repo.create({
      ...oldItinerary,
      start_time: updateDto.start_time,
      end_time: updateDto.end_time,
      route: updateDto.route,
      km_traveled: updateDto.km_traveled ? Number(updateDto.km_traveled) : 0, // <-- cambio
      shift_id: Number(updateDto.shift_id),
      effective_date: new Date(),
      is_active: true,
      id: undefined,
      created_at: undefined,
      updated_at: undefined,
    });
    

    return repo.save(newItinerary);
  }

  /**
   * Procesa todos los itinerarios en UNA transacción (all-or-nothing).
   */
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

      for (const dto of bulkDto.itineraries) {
        const { code, ...rest } = dto;
        const saved = await this.updateSingle(code, rest, repo);
        results.push(saved);
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

  /**
   * Lee un buffer de Excel, convierte a DTOs y llama a bulkUpdate().
   * Espera columnas: code, start_time, end_time, route, km_traveled, shift_id
   */
/**
 * Lee un buffer de Excel, convierte a DTOs y llama a bulkUpdate().
 * Espera columnas de tu Excel real:
 * idItinerario, Recorrido, Hora despacho, Hora fin Itinerario, Km recorridos, turno
 */
async importFromExcel(buffer: Buffer): Promise<{ updated: number; items: Itinerary[] }> {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) throw new BadRequestException('El Excel no tiene hojas');

  const sheet = workbook.Sheets[sheetName];
  const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: '', raw: false });

  // Columnas que esperas en TU Excel
  const required = [
    'idItinerario',
    'Recorrido',
    'Hora despacho',
    'Hora fin Itinerario',
    'Km recorridos',
    'turno',
  ];

  const missingCols = required.filter((c) => !Object.keys(rows[0] || {}).includes(c));
  if (missingCols.length) {
    throw new BadRequestException(
      `Faltan columnas obligatorias en Excel: ${missingCols.join(', ')}`
    );
  }

  // Mapeo de columnas del Excel -> DTO que espera bulkUpdate
  const toDto = (r: any): UpdateItineraryWithCodeDto => ({
    code: String(r['idItinerario']).trim(),
    start_time: String(r['Hora despacho']).trim(),
    end_time: String(r['Hora fin Itinerario']).trim(),
    route: String(r['Recorrido']).trim(),
    km_traveled: r['Km recorridos']
      ? Number(String(r['Km recorridos']).replace(' KM', '').trim())
      : 0,
    shift_id: String(r['turno']).trim(),
  });

  const itineraries = rows
    .map(toDto)
    .filter((r) => r.code); // evitar filas vacías

  return this.bulkUpdate({ itineraries });
}


  // ---------- EXISTENTE ----------
  async findByLine(line: string): Promise<Record<string, Itinerary[]>> {
    const allItineraries = await this.itineraryRepository.find({ where: { is_active: true } });
    const filtered = allItineraries.filter((it) => it.code.endsWith(line));
    const grouped: Record<string, Itinerary[]> = {};

    for (const item of filtered) {
      const groupKey = item.itinerary;
      if (!grouped[groupKey]) grouped[groupKey] = [];
      grouped[groupKey].push(item);
    }

    for (const key in grouped) {
      grouped[key] = grouped[key].sort((a, b) => {
        const getNumber = (code: string) => parseInt(code.replace(line, '').trim(), 10);
        return getNumber(a.code) - getNumber(b.code);
      });
    }

    return grouped;
  }
}

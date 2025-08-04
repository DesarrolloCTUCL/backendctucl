import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Itinerary } from './../../../database/entities/itinerary.entity';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';

@Injectable()
export class ItineraryService {
  private readonly logger = new Logger(ItineraryService.name);

  constructor(
    @InjectRepository(Itinerary)
    private readonly itineraryRepository: Repository<Itinerary>,
  ) {}

  async findAll(): Promise<Itinerary[]> {
    // Solo itinerarios activos
    return this.itineraryRepository.find({
      where: { is_active: true },
    });
  }

  async findOne(code: string): Promise<Itinerary> {
    const result = await this.itineraryRepository.findOne({
      where: { code, is_active: true },
    });
    if (!result) {
      throw new NotFoundException(`Itinerary with code ${code} not found`);
    }
    return result;
  }

  async update(code: string, updateDto: UpdateItineraryDto): Promise<Itinerary> {
    try {
      // Busca el registro activo actual para ese código
      const oldItinerary = await this.itineraryRepository.findOneBy({ code, is_active: true });

      if (!oldItinerary) {
        throw new NotFoundException(`Itinerary with code ${code} not found`);
      }

      // Desactiva todos los registros activos con ese código (por seguridad)
      await this.itineraryRepository.update({ code, is_active: true }, { is_active: false });

      // Crea el nuevo registro activo con los datos nuevos
      const newItinerary = this.itineraryRepository.create({
        ...oldItinerary,
        start_time: updateDto.start_time,
        end_time: updateDto.end_time,
        route: updateDto.route,
        km_traveled: updateDto.km_traveled,
        shift_id: Number(updateDto.shift_id),
        effective_date: new Date(),
        is_active: true,
        id: undefined,         // Para que inserte nuevo
        created_at: undefined, // Para que use la fecha actual
        updated_at: undefined,
      });

      return await this.itineraryRepository.save(newItinerary);
    } catch (error) {
      this.logger.error(`❌ Error actualizando itinerario con código ${code}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al actualizar el itinerario');
    }
  }

  async findByLine(line: string): Promise<Record<string, Itinerary[]>> {
    const allItineraries = await this.itineraryRepository.find({
      where: { is_active: true }, // Solo activos
    });

    // Filtra los que terminan en la línea deseada (ej. L2)
    const filtered = allItineraries.filter((it) => it.code.endsWith(line));

    // Agrupa por 'itinerary'
    const grouped: Record<string, Itinerary[]> = {};

    for (const item of filtered) {
      const groupKey = item.itinerary;

      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }

      grouped[groupKey].push(item);
    }

    // Ordena numéricamente dentro de cada grupo por el número antes del 'L'
    for (const key in grouped) {
      grouped[key] = grouped[key].sort((a, b) => {
        const getNumber = (code: string) =>
          parseInt(code.replace(line, '').trim(), 10);
        return getNumber(a.code) - getNumber(b.code);
      });
    }

    return grouped;
  }
}

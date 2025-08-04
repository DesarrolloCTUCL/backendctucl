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
    return this.itineraryRepository.find();
  }

  async findOne(code: string): Promise<Itinerary> {
    const result = await this.itineraryRepository.findOneBy({ code });
    if (!result) {
      throw new NotFoundException(`Itinerary with code ${code} not found`);
    }
    return result;
  }

  async update(code: string, updateDto: UpdateItineraryDto): Promise<Itinerary> {
    try {
      const oldItinerary = await this.itineraryRepository.findOneBy({ code });

      if (!oldItinerary) {
        throw new NotFoundException(`Itinerary with code ${code} not found`);
      }

      // Desactivar el registro anterior
      oldItinerary.is_active = false;
      await this.itineraryRepository.save(oldItinerary);

      // Crear nuevo registro
      const newItinerary = this.itineraryRepository.create({
        ...oldItinerary,
        start_time: updateDto.start_time,
        end_time: updateDto.end_time,
        route: updateDto.route,
        km_traveled: updateDto.km_traveled,
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

  async findByLine(line: string): Promise<Record<string, Itinerary[]>> {
    const allItineraries = await this.itineraryRepository.find();

    // Filtrar los que terminan en la línea deseada (ej. L2)
    const filtered = allItineraries.filter((it) => it.code.endsWith(line));

    // Agrupar por 'itinerary'
    const grouped: Record<string, Itinerary[]> = {};

    for (const item of filtered) {
      const groupKey = item.itinerary;

      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }

      grouped[groupKey].push(item);
    }

    // Ordenar numéricamente dentro de cada grupo por el número antes del 'L'
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

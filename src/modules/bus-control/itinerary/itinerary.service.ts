// itinerary.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Itinerary } from './../../../database/entities/itinerary.entity';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';

@Injectable()
export class ItineraryService {
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
      throw new NotFoundException(`Itinerary with ID ${code} not found`);
    }
    return result;
  }

  async update(code: string, updateDto: UpdateItineraryDto): Promise<Itinerary> {
    const itinerary = await this.itineraryRepository.findOneBy({ code });
  
    if (!itinerary) {
      throw new NotFoundException(`Itinerary with code ${code} not found`);
    }
  
    itinerary.start_time = updateDto.start_time;
    itinerary.end_time = updateDto.end_time;
  
    return this.itineraryRepository.save(itinerary);
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
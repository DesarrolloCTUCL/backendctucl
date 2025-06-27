// itinerary.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Itinerary } from './../../../database/entities/itinerary.entity';

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
}
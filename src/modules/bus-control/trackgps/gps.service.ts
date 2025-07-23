// src/modules/gps/gps.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackGps } from './../../../database/entities/trackgps.entity';
import { Repository } from 'typeorm';
import { CreateGpsDto } from './dto/create-gps.dto';

@Injectable()
export class GpsService {
  constructor(
    @InjectRepository(TrackGps)
    private readonly gpsRepository: Repository<TrackGps>,
  ) {}

  async save(dto: CreateGpsDto) {
    try {
      const entry = this.gpsRepository.create({
        ...dto,
        timestamp: new Date(dto.timestamp),
      });
      const result = await this.gpsRepository.save(entry);
      console.log('Guardado OK:');
      return result;
    } catch (error) {
      console.error('Error guardando en BD:', error);
      throw error; 
    }
  }
  
  
}

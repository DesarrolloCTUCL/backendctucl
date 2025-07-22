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
    const entry = this.gpsRepository.create({
      ...dto,
      timestamp: new Date(dto.timestamp),
    });
    return await this.gpsRepository.save(entry);
  }
}

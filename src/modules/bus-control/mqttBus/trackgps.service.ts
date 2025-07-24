// src/modules/gps/trackgps.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackGps } from './../../../database/entities/trackgps.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrackGpsService {
  constructor(
    @InjectRepository(TrackGps)
    private readonly trackGpsRepo: Repository<TrackGps>,
  ) {}

  async save(data: Partial<TrackGps>): Promise<TrackGps> {
    const track = this.trackGpsRepo.create(data);
    return await this.trackGpsRepo.save(track);
  }
}

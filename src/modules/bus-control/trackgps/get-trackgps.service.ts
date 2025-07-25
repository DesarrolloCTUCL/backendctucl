import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { TrackGps } from './../../../database/entities/trackgps.entity';

@Injectable()
export class TrackGpsService {
  constructor(
    @InjectRepository(TrackGps)
    private readonly trackGpsRepo: Repository<TrackGps>,
  ) {}

  async findByDeviceAndRange(device_id: number, start: string, end: string) {
    // Convertir strings a Date sin alterar la zona horaria (construcción explícita)
    const startDate = new Date(start.replace('T', ' ') + ':00');
    const endDate = new Date(end.replace('T', ' ') + ':00');

    return await this.trackGpsRepo.find({
      where: {
        device_id,
        timestamp: Between(startDate, endDate),
      },
      order: {
        timestamp: 'ASC',
      },
    });
  }
}

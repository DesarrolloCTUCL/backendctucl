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

  private parseLocalDate(dateStr: string) {
    const [datePart, timePart] = dateStr.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hour, minute, second || 0);
  }

  async findByDeviceAndRange(device_id: number, start: string, end: string) {
    const startDate = this.parseLocalDate(start);
    const endDate = this.parseLocalDate(end);

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

  async findLastByDevice(device_id: number) {
    return await this.trackGpsRepo.findOne({
      where: { device_id },
      order: { timestamp: 'DESC' },
    });
  }
}

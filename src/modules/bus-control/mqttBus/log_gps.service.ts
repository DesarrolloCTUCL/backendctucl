// src/modules/log-gps/log-gps.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log_gps } from './../../../database/entities/log-gps.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogGpsService {
  constructor(
    @InjectRepository(Log_gps)
    private readonly logGpsRepository: Repository<Log_gps>,
  ) {}

  async saveGpsData(data: Partial<Log_gps>) {
    const entry = this.logGpsRepository.create(data);
    return this.logGpsRepository.save(entry);
  }
}

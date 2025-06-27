import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log_gps } from '../../../database/entities/log-gps.entity';

@Injectable()
export class LogGPSService {
      constructor(
        @InjectRepository(Log_gps)
        private readonly shiftRepository: Repository<Log_gps>,
      ) {}
    
      async findAll(): Promise<Log_gps[]> {
        return this.shiftRepository.find();
      }
    
      async findOne(id: number): Promise<Log_gps> {
        const result = await this.shiftRepository.findOneBy({ id });
        if (!result) {
          throw new NotFoundException(`Log_gps with ID ${id} not found`);
        }
        return result;
      }
}

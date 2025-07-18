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
      async findByVehicleShiftAndDatetimeRange(
        vehicle_id: number,
        shift_id: number,
        start_datetime: string,
        end_datetime: string,
      ): Promise<Log_gps[]> {
        return this.shiftRepository.createQueryBuilder('log')
          .where('log.vehicle_id = :vehicle_id', { vehicle_id })
          .andWhere('log.shift_id = :shift_id', { shift_id })
          .andWhere('log.datetime BETWEEN :start_datetime AND :end_datetime', {
            start_datetime,
            end_datetime,
          })
          .getMany();
      }
}

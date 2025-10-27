import { Injectable,NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from './../../../database/entities/shift.entity';

@Injectable()
export class ShiftService {
      constructor(
        @InjectRepository(Shift)
        private readonly shiftRepository: Repository<Shift>,
      ) {}
    
      async findAll(): Promise<Shift[]> {
        return this.shiftRepository.find();
      }
    
      async findOne(id: number): Promise<Shift> {
        const result = await this.shiftRepository.findOneBy({ id });
        if (!result) {
          throw new NotFoundException(`shift with ID ${id} not found`);
        }
        return result;
      }

      async updateTimes(id: number, newTimes: string): Promise<Shift> {
        const shift = await this.shiftRepository.findOneBy({ id });
        if (!shift) {
          throw new NotFoundException(`Shift with ID ${id} not found`);
        }
    
        const chainpcCount = shift.chainpc.split(',').map(e => e.trim()).filter(e => e !== '').length;
        const timesCount = newTimes.split(',').map(e => e.trim()).filter(e => e !== '').length;
    
        if (chainpcCount !== timesCount) {
          throw new BadRequestException(
            `El número de elementos en 'times' (${timesCount}) debe coincidir con 'chainpc' (${chainpcCount})`
          );
        }
    
        shift.times = newTimes;
        return this.shiftRepository.save(shift);
      }
    }
      


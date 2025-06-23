import { Injectable,NotFoundException } from '@nestjs/common';
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
    
      async findOne(id: string): Promise<Shift> {
        const result = await this.shiftRepository.findOneBy({ id });
        if (!result) {
          throw new NotFoundException(`shift with ID ${id} not found`);
        }
        return result;
      }
}

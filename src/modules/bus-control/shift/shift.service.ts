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
        const timesArray = newTimes.split(',').map(e => e.trim()).filter(e => e !== '');
      
        if (chainpcCount !== timesArray.length) {
          throw new BadRequestException(
            `El número de elementos en 'times' (${timesArray.length}) debe coincidir con 'chainpc' (${chainpcCount})`
          );
        }
      
        // 🔹 Validar que cada elemento sea un número válido (entero o decimal)
        for (const t of timesArray) {
          if (isNaN(Number(t))) {
            throw new BadRequestException(
              `El formato de 'times' es inválido. Cada elemento debe ser un número válido.`
            );
          }
        }
      
        shift.times = newTimes;
        return this.shiftRepository.save(shift);
      }
      
    }
      


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusLine } from '../../database/entities/bus-line.entity';

@Injectable()
export class BusLineService {
  constructor(
    @InjectRepository(BusLine)
    private busLineRepository: Repository<BusLine>,
  ) {}

  findAll(): Promise<BusLine[]> {
    return this.busLineRepository.find({ relations: ['stationsRelation'] });
  }

  findOne(id: number): Promise<BusLine | null> {
    return this.busLineRepository.findOne({
      where: { id },
      relations: ['stationsRelation'],
    });
  }
}


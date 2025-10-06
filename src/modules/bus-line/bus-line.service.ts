import { Injectable,NotFoundException  } from '@nestjs/common';
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
  async create(data: Partial<BusLine>): Promise<BusLine> {
    const newLine = this.busLineRepository.create(data);
    return this.busLineRepository.save(newLine);
  }


async update(id: number, data: Partial<BusLine>): Promise<BusLine> {
  await this.busLineRepository.update(id, data);
  const updated = await this.busLineRepository.findOne({ where: { id } });

  if (!updated) {
    throw new NotFoundException(`BusLine con id ${id} no encontrado`);
  }

  return updated;
}
}


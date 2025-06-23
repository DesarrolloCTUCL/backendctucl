import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recharge_point } from './../../database/entities/recharge-point.entity';

@Injectable()
export class RechargepointService {
  constructor(
    @InjectRepository(Recharge_point)
    private readonly rechargepointRepository: Repository<Recharge_point>,
  ) {}

  async findAll(): Promise<Recharge_point[]> {
    return this.rechargepointRepository.find();
  }

  async findOne(id: number): Promise<Recharge_point> {
    const result = await this.rechargepointRepository.findOneBy({ id });
    if (!result) {
      throw new NotFoundException(`RechargePoint with ID ${id} not found`);
    }
    return result;
  }
}
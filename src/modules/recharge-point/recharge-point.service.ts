import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recharge_point } from './../../database/entities/recharge-point.entity';
import { CreateRechargePointDto } from './dto/create-recharge-point.dto';

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

  async create(dto:CreateRechargePointDto):Promise<Recharge_point>{
    const newRechargePoint = this.rechargepointRepository.create(dto);
    return this.rechargepointRepository.save(newRechargePoint)
  }

  async findBasicInfo(): Promise<
  { business_name: string; lat: number; long: number; address: string }[]
> {
  return this.rechargepointRepository.find({
    select: ['business_name', 'address','lat', 'long'],
  })
}

async countAll(): Promise<{ total: number }> {
  const total = await this.rechargepointRepository.count()
  return { total }
}

}
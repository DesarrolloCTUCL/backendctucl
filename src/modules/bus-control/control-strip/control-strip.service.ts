import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControlStrip } from 'src/database/entities/control-strip.entity';
import { CreateControlStripDto } from './dto/create-control-strip.dto';

@Injectable()
export class ControlStripService {
  constructor(
    @InjectRepository(ControlStrip)
    private readonly controlStripRepo: Repository<ControlStrip>,
  ) {}

  async create(dto: CreateControlStripDto): Promise<ControlStrip> {
    const newStrip = this.controlStripRepo.create(dto);
    return await this.controlStripRepo.save(newStrip);
  }
}
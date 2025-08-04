import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControlStrip } from 'src/database/entities/control-strip.entity';
import { CreateControlStripDto } from './dto/create-control-strip.dto';

@Injectable()
export class ControlStripService {
  private readonly logger = new Logger(ControlStripService.name);

  constructor(
    @InjectRepository(ControlStrip)
    private readonly controlStripRepo: Repository<ControlStrip>,
  ) {}

  async create(dto: CreateControlStripDto): Promise<ControlStrip> {
    this.logger.log(`📥 Recibido DTO: ${JSON.stringify(dto)}`);

    try {
      const newStrip = this.controlStripRepo.create(dto);
      this.logger.log(`🛠️ Creando entidad: ${JSON.stringify(newStrip)}`);

      const saved = await this.controlStripRepo.save(newStrip);
      this.logger.log(`✅ Registro guardado con ID: ${saved.id}`);

      return saved;
    } catch (error) {
      this.logger.error(`❌ Error al guardar ControlStrip: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al guardar la papeleta de control');
    }
  }
}

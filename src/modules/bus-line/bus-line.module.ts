import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusLine } from '../../database/entities/bus-line.entity';
import { BusLineService } from './bus-line.service';
import { BusLineController } from './bus-line.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BusLine])],  // <-- Esto es clave
  providers: [BusLineService],
  controllers: [BusLineController],
})
export class BusLineModule {}

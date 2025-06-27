import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogGPSService } from './log-gps.service';
import { LogGPSController } from './log-gps.controller';
import { Log_gps } from '../../../database/entities/log-gps.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Log_gps])],
  controllers: [LogGPSController],
  providers: [LogGPSService],
})
export class logGPSTable {}

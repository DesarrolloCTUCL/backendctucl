// src/modules/gps/gps.module.ts
import { Module } from '@nestjs/common';
import { GpsController } from './gps.controller';
import { GpsService } from './gps.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackGps } from './../../../database/entities/trackgps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackGps])],
  controllers: [GpsController],
  providers: [GpsService],
})
export class GpsModule {}

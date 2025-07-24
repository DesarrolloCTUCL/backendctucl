// src/modules/gps/trackgps.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackGps } from './../../../database/entities/trackgps.entity';
import { TrackGpsService } from './trackgps.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackGps])],
  providers: [TrackGpsService],
  exports: [TrackGpsService],
})
export class TrackGpsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackGps } from './../../../database/entities/trackgps.entity';
import { TrackGpsController } from './get-trackgps.controller';
import { TrackGpsService } from './get-trackgps.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackGps])],
  controllers: [TrackGpsController],
  providers: [TrackGpsService],
  exports: [TrackGpsService], // por si lo necesitas desde otro módulo
})
export class GetTrackGpsModule {}

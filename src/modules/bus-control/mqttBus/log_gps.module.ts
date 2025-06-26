import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log_gps } from './../../../database/entities/log-gps.entity';
import { LogGpsService } from './log_gps.service';

@Module({
  imports: [TypeOrmModule.forFeature([Log_gps])],
  providers: [LogGpsService],
  exports: [LogGpsService],
})
export class LogGpsModule {}

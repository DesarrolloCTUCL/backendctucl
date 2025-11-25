import { Module } from '@nestjs/common';
import { BusStationController } from './bus_station.controller';
import { BusStationService } from './bus_station.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusStation } from 'src/database/entities/bus-station.entity';
import { AppConfigModule } from 'src/config/config.module';



@Module({
  imports:[TypeOrmModule.forFeature([BusStation]),AppConfigModule],
  controllers: [BusStationController],
  providers: [BusStationService]
})
export class BusStationModule {}

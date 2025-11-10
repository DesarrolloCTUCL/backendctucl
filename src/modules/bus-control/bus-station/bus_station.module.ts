import { Module } from '@nestjs/common';
import { BusStationController } from './bus_station.controller';
import { BusStationService } from './bus_station.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusStation } from 'src/database/entities/bus-station.entity';



@Module({
  imports:[TypeOrmModule.forFeature([BusStation])],
  controllers: [BusStationController],
  providers: [BusStationService]
})
export class BusStationModule {}

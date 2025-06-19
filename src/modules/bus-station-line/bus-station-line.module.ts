import { Module } from '@nestjs/common';
import { BusStationLineService } from './bus-station-line.service';
import { BusStationLineController } from './bus-station-line.controller';

@Module({
  controllers: [BusStationLineController],
  providers: [BusStationLineService],
})
export class BusStationLineModule {}

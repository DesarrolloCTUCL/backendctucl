import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispatchDisplayService } from './dispatch-display.service';
import { DispatchDisplayController } from './dispatch-display.controller';
import { Schedule } from '../../../database/entities/schedule.entity';
import { Itinerary } from '../../../database/entities/itinerary.entity';
import { BusStation } from '../../../database/entities/bus-station.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Itinerary,BusStation])],
  controllers: [DispatchDisplayController],
  providers: [DispatchDisplayService],
})
export class DispatchDisplayModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispatchDisplayService } from './dispatch-display.service';
import { DispatchDisplayController } from './dispatch-display.controller';
import { Schedule } from '../../../database/entities/schedule.entity';
import { Itinerary } from '../../../database/entities/itinerary.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Itinerary])],
  controllers: [DispatchDisplayController],
  providers: [DispatchDisplayService],
})
export class DispatchDisplayModule {}

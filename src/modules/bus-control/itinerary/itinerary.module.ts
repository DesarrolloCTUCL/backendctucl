// itinerary.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItineraryService } from './itinerary.service';
import { ItineraryController } from './itinerary.controller';
import { Itinerary } from './../../../database/entities/itinerary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Itinerary])],
  controllers: [ItineraryController],
  providers: [ItineraryService],
})
export class ItineraryModule {}

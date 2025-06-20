import { Module } from '@nestjs/common';
import { InteneraryService } from './itinerary.service';
import { InteneraryController } from './itinerary';

@Module({
  controllers: [InteneraryController],
  providers: [InteneraryService],
})
export class ItineraryModule {}

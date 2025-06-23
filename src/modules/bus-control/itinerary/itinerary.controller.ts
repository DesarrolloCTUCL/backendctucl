// itinerary.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';

@Controller('itineraries')
export class ItineraryController {
  constructor(private readonly itineraryService: ItineraryService) {}

  @Get()
  getAll() {
    return this.itineraryService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.itineraryService.findOne(id);
  }
}

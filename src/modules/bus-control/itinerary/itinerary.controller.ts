// itinerary.controller.ts
import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';

@Controller('itineraries')
export class ItineraryController {
  constructor(private readonly itineraryService: ItineraryService) { }

  @Get()
  getAll() {
    return this.itineraryService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.itineraryService.findOne(id);
  }
  @Put(':id')
  updateItinerary(
    @Param('id') id: string,
    @Body() updateDto: UpdateItineraryDto,
  ) {
    return this.itineraryService.update(id, updateDto);
  }

  @Get('line/:line')
  getByLine(@Param('line') line: string) {
    return this.itineraryService.findByLine(line);
  }

}

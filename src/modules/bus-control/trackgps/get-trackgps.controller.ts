import { Controller, Get, Query } from '@nestjs/common';
import { GetTrackGpsDto } from './dto/get-trackgps.dto';
import { TrackGpsService } from './get-trackgps.service';

@Controller('trackgps')
export class TrackGpsController {
  constructor(private readonly trackGpsService: TrackGpsService) {}

  @Get('by-range')
  async getTrackByRange(@Query() query: GetTrackGpsDto) {
    const { device_id, start, end } = query;

    // Aquí NO usamos new Date(), usamos strings directamente
    return await this.trackGpsService.findByDeviceAndRange(device_id, start, end);
  }
}

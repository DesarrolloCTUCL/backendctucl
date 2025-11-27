import { Controller, Get, Query } from '@nestjs/common';
import { GetTrackGpsDto } from './dto/get-trackgps.dto';
import { TrackGpsService } from './get-trackgps.service';

@Controller('trackgps')
export class TrackGpsController {
  constructor(private readonly trackGpsService: TrackGpsService) { }

  @Get('by-range')
  async getTrackByRange(@Query() query: GetTrackGpsDto) {
    const { device_id, start, end } = query;
    const data = await this.trackGpsService.findByDeviceAndRange(
      device_id, start, end,
    );
    return {
      status: 'success',
      data,
    };
  }

  @Get('last')
  async getLastPosition(@Query('device_id') device_id: number) {
    const lastPos = await this.trackGpsService.findLastByDevice(device_id);
    return {
      status: 'success',
      message: 'Última posición obtenida',
      data: lastPos,
    };
  }
}

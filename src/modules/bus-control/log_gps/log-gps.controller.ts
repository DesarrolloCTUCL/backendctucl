import { Controller, Get, Param, Query,ParseIntPipe  } from '@nestjs/common';
import { LogGPSService } from './log-gps.service';

@Controller('logGPS')
export class LogGPSController {
  constructor(private readonly shiftService: LogGPSService) {}

  @Get()
  getAll() {
    return this.shiftService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.shiftService.findOne(id);
  }
  @Get('/filter/strict')
  getFilteredStrict(
    @Query('vehicle_id', ParseIntPipe) vehicle_id: number,
    @Query('shift_id', ParseIntPipe) shift_id: number,
    @Query('start_datetime') start_datetime: string,
    @Query('end_datetime') end_datetime: string,
  ) {
    return this.shiftService.findByVehicleShiftAndDatetimeRange(
      vehicle_id,
      shift_id,
      start_datetime,
      end_datetime,
    );
  }

}

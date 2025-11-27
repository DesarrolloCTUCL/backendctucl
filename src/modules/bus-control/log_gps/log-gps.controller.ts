import { Controller, Get, Param, Query,ParseIntPipe  } from '@nestjs/common';
import { LogGPSService } from './log-gps.service';
import { filter } from 'rxjs';

@Controller('logGPS')
export class LogGPSController {
  constructor(private readonly shiftService: LogGPSService) {}

  @Get()
  async getAll() {
    const data= await this.shiftService.findAll();

    return {
      status: 'success',
      data: data,
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {

    const data= await this.shiftService.findOne(id)
    return {
      status: 'success',
      data: data,
    };
  }

  @Get('/filter/strict')
  async getFilteredStrict(
    @Query('vehicle_id', ParseIntPipe) vehicle_id: number,
    @Query('shift_id', ParseIntPipe) shift_id: number,
    @Query('start_datetime') start_datetime: string,
    @Query('end_datetime') end_datetime: string,
  ) {
    const data= await this.shiftService.findByVehicleShiftAndDatetimeRange(vehicle_id,shift_id,start_datetime,end_datetime);

    return {
      status: 'success',
      data,
    };
  }

}

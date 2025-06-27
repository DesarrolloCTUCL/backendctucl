import { Controller,Get,Param } from '@nestjs/common';
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
}

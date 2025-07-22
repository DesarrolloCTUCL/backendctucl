// src/modules/gps/gps.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { GpsService } from './gps.service';
import { CreateGpsDto } from './dto/create-gps.dto';

@Controller('api/gps')
export class GpsController {
  constructor(private readonly gpsService: GpsService) {}

  @Post()
  async receive(@Body() body: CreateGpsDto) {
    console.log('📡 Datos GPS recibidos:', body);
    return await this.gpsService.save(body);
  }
}

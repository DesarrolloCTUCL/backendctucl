import { Body, Controller, Post } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post('create')
  create(@Body() createVehicle: CreateVehicleDto) {
    return this.vehicleService.create(createVehicle);
    
  }
}

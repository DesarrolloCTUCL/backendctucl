import { Body, Controller, Post, Get, Param, Query, BadRequestException } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { CreatePassengerCounterDto } from './dto/create-counter.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) { }

  @Post('create')
  create(@Body() createVehicle: CreateVehicleDto) {
    return this.vehicleService.create(createVehicle);

  }

  @Post('counter')
  counter(@Body() createCounter: CreatePassengerCounterDto) {
    return this.vehicleService.registerCounter(createCounter);
  }

  @Get('counter/:id')
  getCounters(
    @Param('id') id: number,
    @Query('date') date: string
  ) {
    if (!date) {
      throw new BadRequestException('Query parameter "date" is required');
    }
    return this.vehicleService.findCountersById(id,date);
  }


  @Get()
  getAll() {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.vehicleService.findOne(id);
  }
}

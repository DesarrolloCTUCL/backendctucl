import { Controller, UseGuards, Post, Body, Get, Param, HttpStatus, HttpException } from '@nestjs/common';
import { BusStationService } from './bus_station.service';
import { CreateBusStationDto } from './dto/create-bus-station.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';


@ApiBearerAuth()
@UseGuards(AuthGuard)

@Controller('bus-station')
export class BusStationController {
  constructor(private readonly bus_station_service: BusStationService) {}

  @Public()
  @Post('create')
  create(@Body() createBusStationDto: CreateBusStationDto) {
    return this.bus_station_service.create(createBusStationDto);
  }

  @Public()
  @Get('control-points')  // <--- Mover esta ruta fija arriba de la dinámica
  async getControlPoints() {
    console.log('⚡️ Entrando a getControlPoints');
    try {
      const result = await this.bus_station_service.findControlPoints();
      return {
        status: 'success',
        message: 'Control points retrieved successfully',
        data: result,
      };
    } catch (error) {
      console.error('❌ Error en getControlPoints:', error);
      return {
        status: 'error',
        message: 'Internal server error',
        data: null,
      };
    }
  }
  @Public()
  @Get()
  getAll() {
    return this.bus_station_service.findAll();
  }
  @Public()
  @Get(':id')   // <--- Ruta dinámica debe ir al final
  getOne(@Param('id') id: number) {
    return this.bus_station_service.findOne(id);
  }
}

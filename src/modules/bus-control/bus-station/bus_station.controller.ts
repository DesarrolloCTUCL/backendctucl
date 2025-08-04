import { Controller, UseGuards, Post, Body, Get, Param, HttpStatus, HttpException } from '@nestjs/common';
import { MqttCommand } from './dto/bus-station-mqtt.dto';
import { BusStationService } from './bus_station.service';
import { CreateBusStationDto } from './dto/create-bus-station.dto';

@Controller('bus-station')
export class BusStationController {
  constructor(private readonly bus_station_service: BusStationService) {}

  @Post('create')
  create(@Body() createBusStationDto: CreateBusStationDto) {
    return this.bus_station_service.create(createBusStationDto);
  }

  @Post('mqtt-command')
  executeCommand(@Body() mqttCommand: MqttCommand) {
    return this.bus_station_service.exectMqttCommand(mqttCommand);
  }

  @Get('mqtt-history')
  async getData() {
    return this.bus_station_service.getMqttHistory();
  }

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

  @Get()
  getAll() {
    return this.bus_station_service.findAll();
  }

  @Get(':id')   // <--- Ruta dinámica debe ir al final
  getOne(@Param('id') id: number) {
    return this.bus_station_service.findOne(id);
  }
}

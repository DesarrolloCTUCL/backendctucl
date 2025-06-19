import { Controller, UseGuards, Post, Body, Get, HttpStatus, HttpException } from '@nestjs/common';
import { MqttCommand } from './dto/bus-station-mqtt.dto';
import { BusStationService } from './bus_station.service';
import { CreateBusStationDto } from './dto/create-bus-station.dto';


@Controller('bus-station')
export class BusStationController {
  constructor(private readonly bus_station_service: BusStationService) { }
  @Post('create')
  create(@Body() createBusStationDto: CreateBusStationDto) {
    return this.bus_station_service.create(createBusStationDto);
  }

  @Post('mqtt-command')
  executeCommand(@Body() mqttCommand: MqttCommand) {
    return this.bus_station_service.exectMqttCommand(mqttCommand)
  }
  @Get('mqtt-history')
  async getData() {
    return this.bus_station_service.getMqttHistory();
  }
}

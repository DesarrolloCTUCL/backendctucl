import { Module } from '@nestjs/common';
import { BusStationController } from './bus_station.controller';
import { BusStationService } from './bus_station.service';
import { MqttModule } from 'src/modules/mqtt/mqtt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MqttCommandHistory } from 'src/database/entities/mqtt-command-history.entity';
import { BusStation } from 'src/database/entities/bus-station.entity';



@Module({
  imports:[MqttModule,TypeOrmModule.forFeature([MqttCommandHistory,BusStation])],
  controllers: [BusStationController],
  providers: [BusStationService]
})
export class BusStationModule {}

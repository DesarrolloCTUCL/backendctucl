// src/modules/mqtt/mqtt.module.ts
import { Module } from '@nestjs/common';
import { MqttServiceAWS } from './mqtt.service';
import { MqttGateway } from './mqtt.gateway'; // 👈 importar el gateway
import { LogGpsModule } from './log_gps.module';
import { TrackGpsModule } from './trackgps.module';

@Module({
  imports: [LogGpsModule, TrackGpsModule],
  providers: [MqttServiceAWS, MqttGateway], // 👈 agregar gateway aquí
  exports: [MqttServiceAWS, MqttGateway],  // 👈 exportar si lo quieres usar en otros módulos
})
export class MqttModuleAWS {}

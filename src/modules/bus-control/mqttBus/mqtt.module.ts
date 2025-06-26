// src/modules/mqtt/mqtt.module.ts
import { Module } from '@nestjs/common';
import { MqttServiceAWS } from './mqtt.service';
import { LogGpsModule } from './log_gps.module';

@Module({
  imports: [LogGpsModule],
  providers: [MqttServiceAWS],
  exports: [MqttServiceAWS], // para inyectar en otros lados sin volver a importar
})
export class MqttModuleAWS {}

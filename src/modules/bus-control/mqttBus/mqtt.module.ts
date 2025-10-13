// src/modules/mqtt/mqtt.module.ts
import { Module } from '@nestjs/common';
import { MqttServiceAWS } from './mqtt.service';
import { LogGpsModule } from './log_gps.module';
import { TrackGpsModule } from './trackgps.module'; // Ajusta la ruta si es distinta

@Module({
  imports: [LogGpsModule,TrackGpsModule],
  providers: [MqttServiceAWS],
  exports: [MqttServiceAWS], // para inyectar en otros lados sin volver a importar
})
export class MqttModuleAWS {}

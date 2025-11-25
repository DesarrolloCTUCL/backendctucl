// src/modules/mqtt/mqtt.module.ts
import { Module } from '@nestjs/common';
import { MqttServiceAWS } from './mqtt.service';
import { LogGpsModule } from './log_gps.module';
import { TrackGpsModule } from './trackgps.module'; // Ajusta la ruta si es distinta
import { VehicleModule } from '../../vehicle/vehicle.module';

@Module({
  imports: [LogGpsModule,TrackGpsModule,VehicleModule
  ],
  providers: [MqttServiceAWS],
  exports: [MqttServiceAWS], 
})
export class MqttModuleAWS {}

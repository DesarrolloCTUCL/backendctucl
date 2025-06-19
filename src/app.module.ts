import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { UsersModule } from './modules/users/users.module';
import { BusStationModule } from './modules/bus-station/bus_station.module';
import { MqttModule } from './modules/mqtt/mqtt.module';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './modules/company/company.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { DeviceModule } from './modules/device/device.module';
import { BusLineModule } from './modules/bus-line/bus-line.module';
import { BusStationLineModule } from './modules/bus-station-line/bus-station-line.module';
import { InteneraryModule } from './modules/intenerary/intenerary.module';
import { ScheduleModule } from './modules/schedule/schedule.module';



@Module({
  imports: [
    AppConfigModule, // Importa el módulo de configuración
    UsersModule,
    BusStationModule,
    MqttModule,
    DatabaseModule,
    CompanyModule,
    VehicleModule,
    BusLineModule,
    DeviceModule,
    BusStationLineModule,
    InteneraryModule,
    ScheduleModule
  ],
  controllers: [],
})
export class AppModule {}
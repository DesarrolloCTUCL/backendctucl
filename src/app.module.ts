import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { UsersModule } from './modules/users/users.module';
import { BusStationModule } from './modules/bus-control/bus-station/bus_station.module';
import { MqttModuleAWS } from './modules/bus-control/mqttBus/mqtt.module';
import { LogGpsModule } from './modules/bus-control/mqttBus/log_gps.module';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './modules/company/company.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { DeviceModule } from './modules/device/device.module';
import { BusLineModule } from './modules/bus-line/bus-line.module';
import { BusStationLineModule } from './modules/bus-station-line/bus-station-line.module';
import { ItineraryModule } from './modules/bus-control/itinerary/itinerary.module';
import { ScheduleModule } from './modules/bus-control/schedule/schedule.module';
import { ShiftModule } from './modules/bus-control/shift/shift.module';
import { RechargepointModule } from './modules/recharge-point/recharge-point.module';
import { DispatchDisplayModule } from './modules/bus-control/dispatch-display/dispatch-display.module';
import { logGPSTable } from './modules/bus-control/log_gps/log-gps.module';
import { TrackGpsModule } from './modules/bus-control/mqttBus/trackgps.module';
import { GetTrackGpsModule } from './modules/bus-control/trackgps/get-trackgps.module';


@Module({
  imports: [
    AppConfigModule, // Importa el módulo de configuración
    UsersModule,
    BusStationModule,
    DatabaseModule,
    CompanyModule,
    VehicleModule,
    BusLineModule,
    DeviceModule,
    BusStationLineModule,
    ItineraryModule,
    ScheduleModule,
    ShiftModule,
    ItineraryModule,
    ScheduleModule,
    RechargepointModule,
    DispatchDisplayModule,
    MqttModuleAWS,
    LogGpsModule,
    logGPSTable,
    TrackGpsModule,
    GetTrackGpsModule
  ],
  controllers: [],
})
export class AppModule {}
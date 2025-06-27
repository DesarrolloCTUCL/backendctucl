import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/config/config.module';
import { AppConfigService} from 'src/config/config.service';
import { MqttCommandHistory } from './entities/mqtt-command-history.entity';
import { Company } from './entities/company.entity';
import { Recharge_point } from './entities/recharge-point.entity';
import { User } from './entities/user.entity';
import { BusLine } from './entities/bus-line.entity';
import { BusLineStations } from './entities/bus-station-line.entity';
import { BusStation } from './entities/bus-station.entity';
import { Device } from './entities/device.entity';
import { Itinerary } from './entities/itinerary.entity';
import { Schedule } from './entities/schedule.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Shift } from './entities/shift.entity';
import { Log_gps } from './entities/log-gps.entity';
import { PassengerCounter } from './entities/passenger-counter.entity';

@Module({
  imports: [
    AppConfigModule, // Importa ConfigModule para acceder a las variables de entorno
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule], // Asegura que ConfigService esté disponible
      inject: [AppConfigService], // Inyecta el servicio de configuración
      useFactory: (configService: AppConfigService) => ({
        type: 'postgres',
        host: configService.config.db.host,
        port: configService.config.db.port,
        username: configService.config.db.username,
        password: configService.config.db.paswword,
        database: configService.config.db.database,
        entities: [
          BusLine,
          BusLineStations,
          BusStation,
          Recharge_point,
          Company,
          Device,
          Itinerary,
          MqttCommandHistory,
          Schedule,
          User,
          Vehicle,
          Shift,
          Log_gps,
          PassengerCounter
        ],
        synchronize: false,
        ssl: process.env.DB_SSL === 'true'
        ? { rejectUnauthorized: false }
        : false,
     // Maneja sincronización con una variable
      }),
    }),
  ],
  exports: [TypeOrmModule], // Exportamos TypeORM para usarlo en otros módulos
})
export class DatabaseModule {}

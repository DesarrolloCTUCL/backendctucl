import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Company } from 'src/database/entities/company.entity';
import { Vehicle } from 'src/database/entities/vehicle.entity';
import { PassengerCounter } from 'src/database/entities/passenger-counter.entity';
import { Itinerary } from 'src/database/entities/itinerary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company, Vehicle,PassengerCounter,Itinerary])],
  controllers: [VehicleController],
  providers: [VehicleService],
  exports: [VehicleService]
})
export class VehicleModule {}

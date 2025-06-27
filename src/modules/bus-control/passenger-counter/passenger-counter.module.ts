import { Module } from '@nestjs/common';
import { PassengerCounterService } from './passenger-counter.service';
import { PassengerCounterController } from './passenger-counter.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/database/entities/vehicle.entity';
import { Itinerary } from 'src/database/entities/itinerary.entity';


@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Vehicle,Itinerary])],
  controllers: [PassengerCounterController],
  providers: [PassengerCounterService],
})
export class PassengerCounterModule {}

// itinerary.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RechargepointService } from './recharge-point.service';
import { RechargepointController } from './recharge-point.controller';
import { Recharge_point } from './../../database/entities/recharge-point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recharge_point])],
  controllers: [RechargepointController],
  providers: [RechargepointService],
})
export class RechargepointModule {}

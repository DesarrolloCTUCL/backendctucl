import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlStrip } from 'src/database/entities/control-strip.entity';
import { ControlStripService } from './control-strip.service';
import { ControlStripController } from './control-strip.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ControlStrip])],
  providers: [ControlStripService],
  controllers: [ControlStripController],
})
export class ControlStripModule {}

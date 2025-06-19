import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { AppConfigService } from 'src/config/config.service';
import { AppConfigModule } from 'src/config/config.module';

@Module({
  imports:[AppConfigModule],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}

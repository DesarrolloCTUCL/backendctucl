import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppConfigService } from 'src/config/config.service';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client: mqtt.MqttClient;

  constructor(private readonly configService: AppConfigService) {
    this.client = mqtt.connect(`mqtts://${configService.config.mqtt.broker}:${configService.config.mqtt.port}`, {
      username: configService.config.mqtt.username,
      password: configService.config.mqtt.password,
      rejectUnauthorized: false,
    });

    this.client.on('connect', () => {
      console.log('🔗 Conectado al broker MQTT');
    });

    this.client.on('error', (error) => {
      console.error('❌ Error en la conexión MQTT:', error);
    });
  }

  // en el futuro se recomienda tipar el message para tener un mayor control de los payloads
  async publish(topic: string, message: any): Promise<boolean> {
    const payload = JSON.stringify(message);
  
    try {
      await new Promise<void>((resolve, reject) => {
        this.client.publish(topic, payload, { qos: 1 }, (err) => {
          if (err) {
            console.error('❌ Error publicando en MQTT:', err);
            reject(err);
          } else {
            resolve();
          }
        });
      });
  
      return true; // Devuelve `true` si se publica correctamente
    } catch (error) {
      return false; // Devuelve `false` si hay un error
    }
  }
  onModuleDestroy() {
    this.client.end();
  }

  onModuleInit() {
    console.log('✅ MqttService inicializado');
  }
}

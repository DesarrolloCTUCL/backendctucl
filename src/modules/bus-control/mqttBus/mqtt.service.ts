import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';
import * as fs from 'fs';
import { certsPath } from '../../../config/mqtt.config';
import { LogGpsService } from './log_gps.service';
import { TrackGpsService } from './trackgps.service';
import { MqttGateway } from './mqtt.gateway';   // 👈 nuevo

@Injectable()
export class MqttServiceAWS implements OnModuleInit {
  private client: mqtt.MqttClient;
  private isConnected = false;

  constructor(
    private readonly logGpsService: LogGpsService,
    private readonly trackGpsService: TrackGpsService,
    private readonly mqttGateway: MqttGateway,   // 👈 inyectar gateway
  ) {}

  onModuleInit() {
    this.connectToMqtt();
  }

  private connectToMqtt() {
    if (this.isConnected) return;

    const host = 'a3okayccf7oceg-ats.iot.us-east-1.amazonaws.com';
    const port = 8883;
    const clientId = 'backend_mqtt_listener';

    this.client = mqtt.connect({
      host,
      port,
      protocol: 'mqtts',
      clientId,
      key: fs.readFileSync(certsPath.key),
      cert: fs.readFileSync(certsPath.cert),
      ca: fs.readFileSync(certsPath.ca),
      rejectUnauthorized: true,
    });

    this.client.once('connect', () => {
      console.log(`✅ Conectado como: ${clientId}`);
      this.client.subscribe(['buses/gps/+', 'buses/gps_track/+']);
      this.isConnected = true;
    });

    this.client.on('message', async (topic, payload) => {
      try {
        const data = JSON.parse(payload.toString());

        if (topic.startsWith('buses/gps_track/')) {
          const [datePart, timePart] = data.timestamp.split(' ');
          const [day, month, year] = datePart.split('/').map(Number);
          const [hour, minute, second] = timePart.split(':').map(Number);
          const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
          utcDate.setHours(utcDate.getHours() + 5);

          const saved = await this.trackGpsService.save({
            device_id: Number(data.device_id),
            timestamp: utcDate,
            lat: data.lat,
            lng: data.lng,
            speed: data.speed,
          });

          // 👇 Emitimos la posición en tiempo real al frontend
          this.mqttGateway.emitNewPosition(saved);
        }

      } catch (err) {
        console.error('❌ Error procesando mensaje MQTT:', err.message);
      }
    });

    this.client.on('error', (err) => {
      console.error('❌ Error de conexión MQTT:', err.message);
    });
  }
}

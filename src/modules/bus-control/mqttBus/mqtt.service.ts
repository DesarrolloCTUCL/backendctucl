// src/modules/bus-control/mqttBus/mqtt.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';
import * as fs from 'fs';
import { certsPath } from '../../../config/mqtt.config';
import { LogGpsService } from './log_gps.service';

@Injectable()
export class MqttServiceAWS implements OnModuleInit {
  private client: mqtt.MqttClient;
  private isConnected = false;

  constructor(private readonly logGpsService: LogGpsService) {}

  onModuleInit() {
    this.connectToMqtt();
  }

  private connectToMqtt() {
    if (this.isConnected) {
      console.log('🔁 Ya estás conectado a MQTT. Evitando reconexión.');
      return;
    }

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

      this.client.subscribe('buses/gps/+', (err) => {
        if (err) {
          console.error('❌ Error al suscribirse:', err.message);
        } else {
          console.log('📡 Suscripción exitosa a buses/gps/+');
        }
      });

      this.isConnected = true;
    });

    this.client.on('message', async (topic, payload) => {
      try {
        const data = JSON.parse(payload.toString());
    
        // Parse fecha y hora para crear un objeto Date
        const [day, month, year] = data.fecha.split('/');
        const datetimeString = `${year}-${month}-${day}T${data.hora}`;
        const datetime = new Date(datetimeString);
    
        await this.logGpsService.saveGpsData({
          vehicle_id: data.BusID,
          cpoint: data.punto_controlname ?? '',
          cpoint_id: data.punto_control_id ?? null,
          lat: data.latitud,
          long: data.longitud,
          speed: data.velocidad_kmh.toString(),
          datetime,
        });
    
        console.log(`💾 Datos guardados de ${data.BusID}`);
      } catch (err) {
        console.error('❌ Error procesando mensaje MQTT:', err.message);
      }
    });

    this.client.on('error', (err) => {
      console.error('❌ Error de conexión MQTT:', err.message);
    });
  }
}

// src/modules/bus-control/mqttBus/mqtt.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';
import * as fs from 'fs';
import { certsPath } from '../../../config/mqtt.config';
import { LogGpsService } from './log_gps.service';
import { TrackGpsService } from './trackgps.service'; // Ajusta la ruta si es diferente

@Injectable()
export class MqttServiceAWS implements OnModuleInit {
  private client: mqtt.MqttClient;
  private isConnected = false;

  constructor(
    private readonly logGpsService: LogGpsService,
    private readonly trackGpsService: TrackGpsService
  ) {}

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

      this.client.subscribe(['buses/gps/+', 'buses/gps_track/+'], (err) => {
        if (err) {
          console.error('❌ Error al suscribirse:', err.message);
        } else {
          console.log('📡 Suscripción exitosa a buses/gps/+ y buses/gps_track/+');
        }
      });

      this.isConnected = true;
    });

    this.client.on('message', async (topic, payload) => {
      try {
        const data = JSON.parse(payload.toString());
        if (topic.startsWith('buses/gps/')) {
          // Procesamiento existente
          const datetime = new Date(data.datetime.replace(' ', 'T'));

          await this.logGpsService.saveGpsData({
            vehicle_id: data.BusID,
            cpoint: data.punto_controlname ?? '',
            control_point_id: data.punto_control_id ?? null,
            shift_id: data.shift_id ?? null,
            lat: data.latitud,
            long: data.longitud,
            speed: data.velocidad_kmh.toString(),
            datetime,
          });

          console.log(`💾 Control Point guardado de ${data.BusID}`);
        } else if (topic.startsWith('buses/gps_track/')) {
          // Procesamiento para trackgps
        
          // El timestamp viene en formato 'DD/MM/YYYY HH:mm:ss'
          const [datePart, timePart] = data.timestamp.split(' ');
          const [day, month, year] = datePart.split('/').map(Number);
          const [hour, minute, second] = timePart.split(':').map(Number);
        
          // Construir fecha en UTC según lo recibido
          const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
        
          // Ajustar a hora de Ecuador (UTC-5 → sumar 5 horas)
          utcDate.setHours(utcDate.getHours() + 5);
        
          await this.trackGpsService.save({
            device_id: Number(data.device_id),
            timestamp: utcDate,
            lat: data.lat,
            lng: data.lng,
            speed: data.speed,
          });
        
          console.log(`📍 TrackGPS guardado de ${data.device_id} con hora local: ${utcDate.toISOString()}`);
        }
      } catch (err) {
        console.error('❌ Error procesando mensaje MQTT:', err.message);
        console.error('📛 Payload recibido (crudo):', payload.toString());
      }
    });

    this.client.on('error', (err) => {
      console.error('❌ Error de conexión MQTT:', err.message);
    });
  }
}

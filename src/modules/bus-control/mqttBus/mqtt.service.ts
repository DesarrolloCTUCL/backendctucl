// src/modules/bus-control/mqttBus/mqtt.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';
import * as fs from 'fs';
import { certsPath } from '../../../config/mqtt.config'; // 👈 importa la config
import { LogGpsService } from '../mqttBus/log_gps.service';

@Injectable()
export class MqttServiceAWS implements OnModuleInit {
  private client: mqtt.MqttClient;
  constructor(private readonly logGpsService: LogGpsService) {}
  onModuleInit() {
    this.connectToMqtt();
  }

  private connectToMqtt() {
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

    this.client.on('connect', () => {
      console.log(`✅ Conectado como: ${clientId}`);
      this.client.subscribe('buses/gps/+', (err) => {
        if (err) {
          console.error('❌ Error al suscribirse:', err.message);
        } else {
          console.log('📡 Suscripción exitosa a buses/gps/+');
        }
      });
    });

    this.client.on('message', async (topic, payload) => {
      try {
        const data = JSON.parse(payload.toString());
    
        await this.logGpsService.saveGpsData({
          vehicle_id: data.BusID,
          itinerary: data.itinerario_id ? data.itinerario_id.toString() : '',
          control_point: data.punto_control ?? null,
          lat: data.latitud,
          long: data.longitud,
          speed: data.velocidad_kmh.toString(),
          date: data.fecha,
          time: data.hora,
        });
    
        console.log(`💾 Datos guardados de ${data.BusID}`);
      } catch (err) {
        console.error('❌ Error procesando mensaje MQTT:', err.message);
      }
    });
  }
}
import { Injectable } from '@nestjs/common';
import { MqttCommand } from './dto/bus-station-mqtt.dto';
import { MqttService } from 'src/modules/mqtt/mqtt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MqttCommandHistory } from 'src/database/entities/mqtt-command-history.entity';
import { Repository } from 'typeorm';
import { CreateBusStationDto } from './dto/create-bus-station.dto';
import { BusStation } from 'src/database/entities/bus-station.entity';

@Injectable()
export class BusStationService {
  constructor(

    @InjectRepository(MqttCommandHistory)
    private readonly mqttCommandHistoryRepository: Repository<MqttCommandHistory>,
    @InjectRepository(BusStation)
    private readonly busStationRepository: Repository<BusStation>,
    private readonly mqttService: MqttService,
  ) {}

  async create(createBusStationDto: CreateBusStationDto) {
    try {
        const newBusStation = {
      ...createBusStationDto,
      name: createBusStationDto.name.toUpperCase(),
      route: createBusStationDto.route.toUpperCase(),
      address: createBusStationDto.address.toUpperCase(),
        }
       const busStation = await this.busStationRepository.save(newBusStation);

      return {
        message: "Estación de autobuses creada con éxito",
        status: 201,
        result: busStation,
      };
    } catch (error) {
      console.error("Error en create:", error);
      throw new Error("No se pudo crear la estación de autobuses");
    }

  }

  async exectMqttCommand(mqttCommand: MqttCommand) {
    try {
      const isPublished = await this.mqttService.publish(mqttCommand.topic, {
        command: mqttCommand.command,
        path: mqttCommand.path,
      });

      if (!isPublished) {
        throw new Error("Error al publicar el comando en MQTT.");
      }

      const newMqttCommandHistory = this.mqttCommandHistoryRepository.create({
        ...mqttCommand,  
      });

      await this.mqttCommandHistoryRepository.save(newMqttCommandHistory);

      return {
        message: "Petición realizada con éxito",
        status: 200,
        result: true,
      };
    } catch (error) {
      console.error("❌ Error en exectMqttCommand:", error);

      return {
        message: error instanceof Error ? error.message : "Error desconocido",
        status: 500,
        result: false,
      };
    }
  }

  async getMqttHistory(){
    try {
      const db_data = await this.mqttCommandHistoryRepository.find();
      const convertedData = convertToEcuadorTime(db_data);
      const sortedData = convertedData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      return{
        message: "Historial de comandos MQTT obtenido con éxito",
        status: 200,
        result: sortedData,
      }
    } catch (error) {
      console.error("Error en getMqttHistory:", error);
      throw new Error("No se pudo obtener el historial MQTT");
    }
  }
}


function convertToEcuadorTime(data: any[]) {
  return data.map(item => {

    const utcDate = new Date(item.createdAt);
    const ecuadorDate = new Date(utcDate.setHours(utcDate.getHours() - 5)); 
    
    const formattedDate = ecuadorDate.toISOString().split('T')[0];
    const formattedTime = ecuadorDate.toISOString().split('T')[1].split('.')[0];

    return {
      ...item,
      createdAt: ecuadorDate,
      date: formattedDate,
      time: formattedTime
    };
  });
}

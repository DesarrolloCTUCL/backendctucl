import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBusStationDto } from './dto/create-bus-station.dto';
import { BusStation } from 'src/database/entities/bus-station.entity';
import { BusStopType } from 'src/database/entities/bus-station.entity';

@Injectable()
export class BusStationService {
  constructor(
    @InjectRepository(BusStation)
    private readonly busStationRepository: Repository<BusStation>,

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





  async findAll(): Promise<BusStation[]> {
    return this.busStationRepository.find();
  }

  async findOne(id: number): Promise<BusStation> {
    const result = await this.busStationRepository.findOneBy({ id });
    if (!result) {
      throw new NotFoundException(`shift with ID ${id} not found`);
    }
    return result;
  }

  async findControlPoints(): Promise<BusStation[]> {
    try {
      return await this.busStationRepository.find({
        where: { type: BusStopType.CONTROL_POINT },
      });
    } catch (err) {
      console.error('❌ Error al buscar CONTROL_POINT:', err);
      throw err;
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

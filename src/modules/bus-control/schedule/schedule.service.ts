import { Injectable, NotFoundException,BadRequestException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './../../../database/entities/schedule.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    try {
      // 🔍 Normalizamos la fecha para comparar solo el día (sin horas/minutos/segundos)
      const scheduleDate = new Date(createScheduleDto.date);
      scheduleDate.setHours(0, 0, 0, 0);
  
      // Verificar si ya existe un despacho para el mismo bus en esa fecha
      const existing = await this.scheduleRepository.findOne({
        where: {
          vehicle:{register:createScheduleDto.vehicle_id} ,
          date: scheduleDate,
        },
      });
  
      if (existing) {
        throw new BadRequestException(
          `El vehículo ${createScheduleDto.vehicle_id} ya tiene un despacho asignado para la fecha ${scheduleDate.toISOString().split('T')[0]}`,
        );
      }
  
      // Crear y guardar nuevo despacho
      const newSchedule = this.scheduleRepository.create({
        date: scheduleDate,
        observations: createScheduleDto.observations,
        vehicle:{id:createScheduleDto.vehicle_id},
        itinerary:{id:createScheduleDto.itinerary_id},
        busline:{id:createScheduleDto.line_id},
        user:{id:createScheduleDto.user_id},
        driver:{id:createScheduleDto.driver}
      });
  
      return await this.scheduleRepository.save(newSchedule);
  
    } catch (error) {
      console.error("❌ Error al crear despacho:", error);
  
      if (error instanceof BadRequestException) {
        throw error; // ya manejado arriba
      }
  
      // cualquier otro error inesperado
      throw new InternalServerErrorException(
        error.message || "Error inesperado al crear el despacho"
      );
    }
  }
  
  async findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find();
  }

  async findOne(id: number): Promise<Schedule> {
    const result = await this.scheduleRepository.findOneBy({ id });
    if (!result) {
      throw new NotFoundException(`Itinerary with ID ${id} not found`);
    }
    return result;
  }

  async findByExactDate(date: Date): Promise<Schedule[]> {
    const dateOnly = date.toISOString().split('T')[0];
  
    return await this.scheduleRepository
      .createQueryBuilder('schedule')
      .leftJoinAndSelect('schedule.vehicle', 'vehicle')
      .leftJoinAndSelect('schedule.itinerary', 'itinerary')
      .leftJoinAndSelect('schedule.busline', 'busline')
      .leftJoinAndSelect('schedule.driver', 'driver')
      .leftJoinAndSelect('schedule.user', 'user')
      .where('CAST(schedule.date AS DATE) = :date', { date: dateOnly })
      .orderBy('schedule.id', 'ASC')
      .getMany();
  }
  
  
  
}
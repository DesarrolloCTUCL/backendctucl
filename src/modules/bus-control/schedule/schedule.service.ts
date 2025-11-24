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
      const scheduleDate = new Date(createScheduleDto.date);
      scheduleDate.setHours(0, 0, 0, 0);
  
      const existing = await this.scheduleRepository.findOne({
        where: {
          vehicle: { id: createScheduleDto.vehicle_id },
          date: scheduleDate,
        },
      });
  
      if (existing) {
        throw new BadRequestException(
          `El vehículo ${createScheduleDto.vehicle_id} ya tiene un despacho asignado para la fecha ${scheduleDate.toISOString().split('T')[0]}`
        );
      }
  
      const newSchedule = this.scheduleRepository.create({
        date: scheduleDate,           // debe coincidir con la propiedad de Schedule
        itinerary: createScheduleDto.itinerary,
        observations: createScheduleDto.observations,
        vehicle: { id: createScheduleDto.vehicle_id }, // relación ManyToOne
        user: { id: createScheduleDto.user_id },       // relación ManyToOne
        driver: { id: createScheduleDto.driver },      // relación ManyToOne
        busline: { id: createScheduleDto.line_id },   // relación ManyToOne
      });
      
  
      return await this.scheduleRepository.save(newSchedule);
    } catch (error) {
      console.error("❌ Error al crear despacho:", error);
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || "Error inesperado al crear el despacho");
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
      .leftJoinAndSelect('schedule.busline', 'busline')
      .leftJoinAndSelect('schedule.driver', 'driver')
      .leftJoinAndSelect('schedule.user', 'user')
      .where('CAST(schedule.date AS DATE) = :date', { date: dateOnly })
      .orderBy('schedule.id', 'ASC')
      .getMany();
  }
  
  
  
}
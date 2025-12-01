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
  
      // 🚫 Validar si ya existe un despacho para ese bus en esa fecha
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
  
      // 🔍 Buscar entidades reales
      const vehicle = await this.scheduleRepository.manager.findOne('Vehicle', {
        where: { id: createScheduleDto.vehicle_id }
      });
  
      const user = await this.scheduleRepository.manager.findOne('User', {
        where: { id: createScheduleDto.user_id }
      });
  
      const driver = await this.scheduleRepository.manager.findOne('User', {
        where: { id: createScheduleDto.driver }
      });
  
      if (!vehicle) throw new BadRequestException("Vehículo no encontrado");
      if (!user) throw new BadRequestException("Usuario asignador no encontrado");
      if (!driver) throw new BadRequestException("Conductor no encontrado");
  
      // 🟢 Crear Schedule con sus relaciones
      const newSchedule = this.scheduleRepository.create({
        date: scheduleDate,
        itinerary: createScheduleDto.itinerary,
        line_id: createScheduleDto.line_id,
        observations: createScheduleDto.observations ?? "",
  
        vehicle: vehicle,      
        user: user,           
        driverUser: driver      
      });
  
      return await this.scheduleRepository.save(newSchedule);
  
    } catch (error) {
      console.error("❌ Error al crear despacho:", error);
  
      if (error instanceof BadRequestException) throw error;
  
      throw new InternalServerErrorException(
        error.message || "Error inesperado al crear el despacho"
      );
    }
  }
  
  
  async findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find();
  }



  async findByExactDate(date: Date): Promise<any[]> {
    const dateOnly = date.toISOString().split('T')[0];
  
    return await this.scheduleRepository
      .createQueryBuilder('schedule')
      .leftJoin('schedule.vehicle', 'vehicle')
      .addSelect(['vehicle.id', 'vehicle.register'])
      .where('CAST(schedule.date AS DATE) = :date', { date: dateOnly })
      .getMany();
  }

async deleteByVehicleAndDate(vehicle_id: number, date: string): Promise<{ message: string }> {
  const dateOnly = date.split('T')[0]; // por si envían ISO

  const schedule = await this.scheduleRepository
    .createQueryBuilder('schedule')
    .leftJoin('schedule.vehicle', 'vehicle')
    .where('vehicle.id = :vehicle_id', { vehicle_id })
    .andWhere('CAST(schedule.date AS DATE) = :date', { date: dateOnly })
    .getOne();

  if (!schedule) {
    throw new NotFoundException(
      `No existe un itinerario para el vehículo ${vehicle_id} en la fecha ${dateOnly}`
    );
  }

  await this.scheduleRepository.remove(schedule);

  return {
    message: `Itinerario del vehículo ${vehicle_id} en la fecha ${dateOnly} eliminado correctamente`
  };
}

async findByVehicleAndDate(vehicle_id: number, date: string): Promise<any> {
  const dateOnly = date.split('T')[0];

  const schedule = await this.scheduleRepository
    .createQueryBuilder('schedule')
    .leftJoin('schedule.vehicle', 'vehicle')
    .addSelect(['vehicle.id', 'vehicle.register']) 
    .where('vehicle.id = :vehicle_id', { vehicle_id })
    .andWhere('CAST(schedule.date AS DATE) = :date', { date: dateOnly })
    .getOne();

  if (!schedule) {
    throw new NotFoundException(
      `No existe un itinerario para el vehículo en la fecha ${dateOnly}`,
    );
  }

  return schedule;
}


}
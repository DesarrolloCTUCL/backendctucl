import { Controller, Get, Param, Post, Body, Query, Delete } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule } from './../../../database/entities/schedule.entity';
import { BadRequestException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/schedule.dto';


@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) { }


  @Get()
  getAll() {
    return this.scheduleService.findAll();
  }

  @Get('by-exact-date')
  async findByExactDate(@Query('date') date: string) {
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Formato de fecha inválido. Usa YYYY-MM-DD');
    }

    const schedules = await this.scheduleService.findByExactDate(parsedDate);

    return {
      status: 'success',
      data: schedules,
    };
  }



  @Post()
  async create(@Body() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleService.create(createScheduleDto);
  }

  @Delete('delete-by-vehicle-date')
  async deleteByVehicleAndDate(
    @Query('vehicle_id') vehicle_id: string,
    @Query('date') date: string,
  ) {
    if (!vehicle_id || !date) {
      throw new BadRequestException('vehicle_id y date son requeridos');
    }

    return await this.scheduleService.deleteByVehicleAndDate(
      Number(vehicle_id),
      date
    );
  }
  @Get('by-vehicle-date')
  async findByVehicleDate(
    @Query('vehicle_id') vehicle_id: string,
    @Query('date') date: string,
  ) {
    if (!vehicle_id || !date) {
      throw new BadRequestException('vehicle_id y date son requeridos');
    }

    return this.scheduleService.findByVehicleAndDate(Number(vehicle_id), date);
  }

}

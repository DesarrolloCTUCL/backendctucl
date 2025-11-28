import { Controller, Get, Param, Post, Body, Query, Delete, BadRequestException } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule } from './../../../database/entities/schedule.entity';
import { CreateScheduleDto } from './dto/schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  async getAll() {
    const schedules = await this.scheduleService.findAll();
    return {
      status: 'success',
      data: schedules,
    };
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
  async create(@Body() createScheduleDto: CreateScheduleDto): Promise<any> {
    const created = await this.scheduleService.create(createScheduleDto);

    return {
      status: 'success',
      data: created,
    };
  }

  // =====================================================
  //   GET by vehicle + date  => { status, data }
  // =====================================================
  @Get('by-vehicle-date')
  async findByVehicleDate(
    @Query('vehicle_id') vehicle_id: string,
    @Query('date') date: string,
  ) {
    if (!vehicle_id || !date) {
      throw new BadRequestException('vehicle_id y date son requeridos');
    }

    const schedule = await this.scheduleService.findByVehicleAndDate(
      Number(vehicle_id),
      date,
    );

    return {
      status: 'success',
      data: schedule,
    };
  }

  // =====================================================
  //   DELETE by vehicle + date  => { status, message }
  // =====================================================
  @Delete('delete-by-vehicle-date')
  async deleteByVehicleAndDate(
    @Query('vehicle_id') vehicle_id: string,
    @Query('date') date: string,
  ) {
    if (!vehicle_id || !date) {
      throw new BadRequestException('vehicle_id y date son requeridos');
    }

    const result = await this.scheduleService.deleteByVehicleAndDate(
      Number(vehicle_id),
      date,
    );

    return {
      status: 'success',
      message: 'Despacho eliminado correctamente',
      data: result ?? null,
    };
  }
}

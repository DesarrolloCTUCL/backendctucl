import { Controller, Get, Param, Query } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule } from './../../../database/entities/schedule.entity';
import { BadRequestException } from '@nestjs/common';


@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) { }


  @Get()
  getAll() {
    return this.scheduleService.findAll();
  }

  @Get('by-exact-date')
  async findByExactDate(@Query('date') date: string): Promise<Schedule[]> {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Formato de fecha inválido. Usa YYYY-MM-DD');
    }
    return this.scheduleService.findByExactDate(parsedDate);
  }
  
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.scheduleService.findOne(id);
  }




}

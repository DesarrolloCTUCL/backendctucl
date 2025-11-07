import { Controller, Get, Param,Post,Body, Query } from '@nestjs/common';
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
  
  
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.scheduleService.findOne(id);
  }

  @Post()
  async create(@Body() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleService.create(createScheduleDto);
  }


}

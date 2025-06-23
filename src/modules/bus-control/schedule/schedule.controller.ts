import { Controller, Get, Param } from '@nestjs/common';
import { ScheduleService } from './schedule.service';


@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}


  @Get()
  getAll() {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.scheduleService.findOne(id);
  }

}

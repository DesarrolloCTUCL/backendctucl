import { Controller,Get,Param } from '@nestjs/common';
import { ShiftService } from './shift.service';

@Controller('shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Get()
  getAll() {
    return this.shiftService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.shiftService.findOne(id);
  }
}

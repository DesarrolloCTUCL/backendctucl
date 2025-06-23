import { Controller, Get, Param } from '@nestjs/common';
import { RechargepointService } from './recharge-point.service';

@Controller('recharge-point')
export class RechargepointController {
  constructor(private readonly rechargepointService: RechargepointService) {}

  @Get()
  getAll() {
    return this.rechargepointService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.rechargepointService.findOne(id);
  }
}

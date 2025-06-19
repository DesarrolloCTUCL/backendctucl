import { Controller, Get } from '@nestjs/common';
import { BusLineService } from './bus-line.service';

@Controller('bus-line')
export class BusLineController {
  constructor(private readonly busLineService: BusLineService) {}

  @Get()
  async findAll() {
    return this.busLineService.findAll();
  }
}

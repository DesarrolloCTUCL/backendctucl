import { Body, Controller, Post } from '@nestjs/common';
import { CreateControlStripDto } from './dto/create-control-strip.dto';
import { ControlStripService } from './control-strip.service';

@Controller('control-strip')
export class ControlStripController {
  constructor(private readonly controlStripService: ControlStripService) {}

  @Post()
  create(@Body() dto: CreateControlStripDto) {
    return this.controlStripService.create(dto);
  }
}

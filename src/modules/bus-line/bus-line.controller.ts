import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { BusLineService } from './bus-line.service';
import { CreateBusLineDto } from './dto/bus-line-create.dto';

@Controller('bus-line')
export class BusLineController {
  constructor(private readonly busLineService: BusLineService) { }

  @Get()
  async findAll() {
    const data = await this.busLineService.findAll();
    return {
      status: 'success',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.busLineService.findOne(+id);
    return {
      status: 'success',
      data,
    };
  }

  @Post()
  async create(@Body() dto: CreateBusLineDto) {
    const data = await this.busLineService.create(dto);
    return {
      status: 'success',
      data,
    };
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: CreateBusLineDto) {
    const data = await this.busLineService.update(+id, dto);
    return {
      status: 'success',
      data,
    };
  }


}

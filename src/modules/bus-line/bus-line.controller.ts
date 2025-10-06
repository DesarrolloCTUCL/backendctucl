import { Controller, Get ,Post,Body,Param,Patch} from '@nestjs/common';
import { BusLineService } from './bus-line.service';
import { CreateBusLineDto } from './dto/bus-line-create.dto';

@Controller('bus-line')
export class BusLineController {
  constructor(private readonly busLineService: BusLineService) {}

  @Get()
  async findAll() {
    return this.busLineService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.busLineService.findOne(+id);
  }

  @Post()
  async create(@Body() dto: CreateBusLineDto) {
    return this.busLineService.create(dto);
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: CreateBusLineDto) {
    return this.busLineService.update(+id, dto);
  }
  
}

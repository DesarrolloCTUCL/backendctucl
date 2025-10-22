import { Controller, Get, Param,Post,Body } from '@nestjs/common';
import { RechargepointService } from './recharge-point.service';
import { CreateRechargePointDto } from './dto/create-recharge-point.dto';


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
  @Post()
  create(@Body () dto: CreateRechargePointDto){
    return this.rechargepointService.create(dto);
  }
}

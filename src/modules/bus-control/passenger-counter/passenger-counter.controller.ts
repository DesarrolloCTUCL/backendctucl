import { Controller, Post ,Body} from '@nestjs/common';
import { PassengerCounterService } from './passenger-counter.service';
import { CreatePassengerCounterDto } from './dto/create-passenger-counter.dto';

@Controller('passenger-counter')
export class PassengerCounterController {
  constructor(private readonly passengerCounterService: PassengerCounterService) {}

  @Post()
    create(@Body() createPassengerCounterDto: CreatePassengerCounterDto) {
      return this.passengerCounterService.createPassengerCounter(createPassengerCounterDto);
    }

}

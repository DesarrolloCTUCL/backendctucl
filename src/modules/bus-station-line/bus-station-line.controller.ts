import { Controller } from '@nestjs/common';
import { BusStationLineService } from './bus-station-line.service';

@Controller('bus-station-line')
export class BusStationLineController {
  constructor(private readonly busStationLineService: BusStationLineService) {}
}

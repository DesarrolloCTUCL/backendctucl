import { Controller } from '@nestjs/common';
import { InteneraryService } from './intenerary.service';

@Controller('intenerary')
export class InteneraryController {
  constructor(private readonly inteneraryService: InteneraryService) {}
}

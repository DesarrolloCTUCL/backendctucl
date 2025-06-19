import { Module } from '@nestjs/common';
import { InteneraryService } from './intenerary.service';
import { InteneraryController } from './intenerary.controller';

@Module({
  controllers: [InteneraryController],
  providers: [InteneraryService],
})
export class InteneraryModule {}

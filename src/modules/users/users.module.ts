import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { User } from 'src/database/entities/user.entity';
import { Company } from 'src/database/entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLoggerService } from 'src/common/logger/app-logger.service';
import { MailsModule } from 'src/shared/mails/mails.module';
import { AppConfigModule } from 'src/config/config.module';
import { Vehicle } from 'src/database/entities/vehicle.entity';




@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([User,Company,Vehicle]),MailsModule,AppConfigModule],
  controllers: [UsersController],
  providers: [UsersService,AppLoggerService],
  exports:[UsersService]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { User } from 'src/database/entities/user.entity';
import { Company } from 'src/database/entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';




@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([User,Company])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}

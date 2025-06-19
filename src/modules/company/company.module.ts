import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from 'src/database/entities/company.entity';




@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports:[CompanyService]
})
export class CompanyModule {}

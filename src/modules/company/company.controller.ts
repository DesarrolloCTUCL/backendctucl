import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post()
    create(@Body() createCompany: CreateCompanyDto) {
      return this.companyService.create(createCompany);
    }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/database/entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      let companyData = createCompanyDto
      companyData.name = companyData.name.toLocaleUpperCase();
      const savedUser = await this.companyRepository.save(createCompanyDto);
      return {
        message: 'Compania creado con éxito',
        status: 201,
        result: savedUser,
      };
    } catch (error) {
      return {
        message: error instanceof Error ? error.message : 'Error desconocido',
        status: 500,
        result: null,
      };
    }
  }

 
}

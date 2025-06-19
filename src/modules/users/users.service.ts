import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/database/entities/company.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {

      const existingEmail = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      const companyRepository = await this.companyRepository.findOne({
        where: { id: createUserDto.company_id },
      });

      if (!companyRepository) {
        throw new ConflictException('La empresa no existe');
      }


      if (existingEmail) {
        throw new ConflictException('El correo electrónico ya está registrado');
      }
      let userData = {
        ...createUserDto,
        company: companyRepository,
        name: createUserDto.name.toLocaleUpperCase(),
        lastname: createUserDto.lastname.toLocaleUpperCase(),
        address: createUserDto.address ? createUserDto.address.toLocaleUpperCase() : '',
      }
      const savedUser = await this.userRepository.save(userData);

      return {
        message: 'Usuario creado con éxito',
        status: 201,
        result: savedUser,
      };
    } catch (error) {
      console.error('Error al crear usuario:', error);
      return {
        message: error instanceof Error ? error.message : 'Error desconocido',
        status: 500,
        result: null,
      };
    }
  }

  async findUserById(id: string) {
    try {
      const userId = parseInt(id, 10);
      const user = await this.userRepository.findOneBy({ id: userId });

      if (!user) {
        return {
          message: `Usuario con id ${id} no encontrado`,
          status: 404,
          result: null,
        };
      }

      return {
        message: 'Usuario encontrado',
        status: 200,
        result: user,
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

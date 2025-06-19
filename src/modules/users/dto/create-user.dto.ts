import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { AccountType } from 'src/database/entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre de usuario único', example: 'jdoe' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'jdoe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Teléfono del usuario', example: '+593987654321', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Cédula del usuario', example: '1123585671', required: false })
  @IsOptional()
  @IsString()
  dni?: string;

  @ApiProperty({ description: 'Dirección del usuario', example: 'Av. 10 de Agosto y Colón', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'Tipo de cuenta del usuario',
    enum: AccountType,
    example: AccountType.STAFF,
  })
  @IsEnum(AccountType)
  account_type: AccountType;

  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez' })
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'ID de la compañía a la que pertenece el usuario',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  company_id?: number;

  @ApiProperty({
    description: 'Fecha de nacimiento del usuario',
    example: '1990-05-15',
  })
  @IsDateString()
  birthday: string;

}

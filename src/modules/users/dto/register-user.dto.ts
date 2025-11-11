import { 
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsDate,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AccountType } from 'src/common/enum/account-type.enum';
import { Gender } from 'src/common/enum/gender.enum';

export class RegisterUserDto {
  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ description: 'Teléfono del usuario', example: '+593987654321' })
  @IsOptional()
  @IsString()
  @Length(7, 15)
  phone?: string;

  @ApiPropertyOptional({ description: 'Número de documento de identidad (DNI)', example: '1723456789' })
  @IsString()
  dni: string;

  @ApiPropertyOptional({ description: 'Dirección del usuario', example: 'Av. Amazonas 123, Quito' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: 'SecurePass123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Rol del usuario dentro del sistema', enum: AccountType, example: AccountType.ADMIN })
  @IsEnum(AccountType)
  @IsNotEmpty()
  role: AccountType;

  @ApiProperty({ description: 'Nombre del usuario', example: 'John' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Apellido del usuario', example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ description: 'Fecha de nacimiento del usuario', example: '1998-05-10' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  birthday: Date;

  @ApiPropertyOptional({ description: 'Género del usuario', example: Gender.MALE })
  @IsEnum(Gender)
  gender: Gender;

  @ApiPropertyOptional({ description: 'URL de la foto de perfil del usuario', example: 'https://cdn.example.com/profile.jpg' })
  @IsOptional()
  @IsString()
  profile?: string;

  @ApiPropertyOptional({ description: 'Estado del usuario (activo o inactivo)', example: true })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiPropertyOptional({ description: 'ID de la compañía a la que pertenece el usuario', example: 3 })
  @IsOptional()
  @IsNumber()
  company_id?: number;

  @ApiPropertyOptional({ description: 'Registro del vehiculo si es propietario de alguno', example: 1539 })
  @IsOptional()
  @IsNumber()
  vehicle?: number;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateRechargePointDto {
  @IsString()
  @ApiProperty({ description: 'Razón social del punto de carga', example: 'ElectroCargas S.A.' })
  business_name: string;

  @IsString()
  @ApiProperty({ description: 'Nombre del responsable', example: 'Carlos Gómez' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'RUC del punto de carga', example: '0991234567001' })
  ruc: string;

  @IsString()
  @ApiProperty({ description: 'Teléfono de contacto', example: '+593987654321' })
  phone: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ description: 'Correo electrónico', example: 'carlos@empresa.com', required: false })
  email?: string;

  @IsString()
  @ApiProperty({ description: 'Dirección física del punto de carga', example: 'Av. Amazonas y Naciones Unidas' })
  address: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Usuario del dispositivo asociado', example: 'device_001', required: false })
  device_username?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Contraseña del dispositivo asociado', example: 'securepass123', required: false })
  device_password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'ID del dispositivo (futura relación)', example: 'device-id-abc', required: false })
  device_id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Contrato asociado (futura relación)', example: 'contract-2025-001', required: false })
  contract?: string;

  @IsNumber()
  @ApiProperty({ description: 'Latitud geográfica', example: -0.22985 })
  lat: number;

  @IsNumber()
  @ApiProperty({ description: 'Longitud geográfica', example: -78.52495 })
  long: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'Estado del punto (activo/inactivo)', example: true, default: true })
  status?: boolean;
}

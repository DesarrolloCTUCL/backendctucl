import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsPhoneNumber,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { OperationStatus, Grupo, Company } from 'src/database/entities/vehicle.entity';

export class CreateVehicleDto {
  @IsNumber()
  @ApiProperty({ description: 'Número de registro del bus (ej: 1500 - 1738)', example: 1523 })
  register: number;

  @IsString()
  @ApiProperty({ description: 'Nombre del socio (dueño) del bus', example: 'Juan Pérez' })
  partner: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'ID del usuario dueño del vehículo', example: 4, required: false })
  user_id?: number;

  @IsString()
  @ApiProperty({ description: 'Cédula del socio', example: '0102030405' })
  dni: string;

  @IsPhoneNumber('EC')
  @ApiProperty({ description: 'Número de teléfono del socio', example: '+593987654321' })
  phone: string;

  @IsEnum(Company)
  @ApiProperty({ description: 'Empresa a la que pertenece el vehículo', enum: Company })
  company: Company;

  @IsString()
  @ApiProperty({ description: 'Placa del bus', example: 'ABC-1234' })
  plate: string;

  @IsEnum(OperationStatus)
  @IsOptional()
  @ApiProperty({
    description: 'Estado operativo del bus',
    enum: OperationStatus,
    default: OperationStatus.INACTIVE,
    required: false,
  })
  operation_status?: OperationStatus;

  @IsEnum(Grupo)
  @ApiProperty({ description: 'Grupo al que pertenece el bus', enum: Grupo })
  grupo: Grupo;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'Estado del vehículo', example: true, required: false })
  status?: boolean;
}

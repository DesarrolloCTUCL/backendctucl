import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { DeviceType } from 'src/database/entities/device.entity';

export class CreateDeviceDto {
  @ApiProperty({ description: 'Código de identificación', example: 'RT-1539' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Nombre o alias del dispositivo', example: 'Dispositivo 01 - Ruta Norte' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Información breve del dispositivo', example: 'Dispositivo ubicado en terminal norte' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Número de serie del dispositivo', example: 'SN123456789' })
  @IsString()
  serial: string;

  @ApiProperty({ description: 'IMEI del dispositivo', example: '356938035643809' })
  @IsString()
  imei: string;

  @ApiProperty({ description: 'Tipo de dispositivo', enum: DeviceType, example: DeviceType.MOBILE_POS })
  @IsEnum(DeviceType)
  type: DeviceType;

}

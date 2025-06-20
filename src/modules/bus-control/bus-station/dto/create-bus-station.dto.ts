import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { BusStopType } from 'src/database/entities/bus-station.entity';

export class CreateBusStationDto {
  @IsString()
  @ApiProperty({ description: 'Nombre del punto de parada', example: 'Sauces Norte' })
  name: string;

  @ApiProperty({
    example: -3.970767,
    description: 'Latitud del punto GPS',
  })
  @IsNumber()
  @IsLatitude()
  lat: number;

  @ApiProperty({
    example: -79.220854,
    description: 'Latitud del punto GPS',
  })
  @IsNumber()
  @IsLongitude()
  long: number;

  @IsString()
  @ApiProperty({ description: 'Dirección física del punto', example: 'Av. Principal y Calle 5' })
  address: string;

  @IsString()
  @ApiProperty({
    description: 'Ruta relacionada',
    example: 'L1,L2,L5',
  })
  route: string;

  @IsNumber()
  @ApiProperty({ description: 'Radio de alcance del punto en metros', example: 7.5 })
  radius: number;

  @IsEnum(BusStopType)
  @IsOptional()
  @ApiProperty({
    description: 'Tipo del punto (parada, punto de control, etc.)',
    enum: BusStopType,
    example: BusStopType.BUS_STOP,
    default: BusStopType.BUS_STOP,
  })
  type?: BusStopType;


}

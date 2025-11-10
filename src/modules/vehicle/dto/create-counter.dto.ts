import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePassengerCounterDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID del bus (Vehicle)', example: 1734 })
  bus: number;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({ description: 'ID del itinerario (Itinerary)', example: 1, nullable: true })
  itinerary_id?: number;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ description: 'Tiempo de registro del conteo', example: '2025-06-13T10:00:00Z' })
  timestamp: Date;

  @IsBoolean()
  @Type(() => Boolean)
  @ApiProperty({ description: 'Conteo especial o no', example: false })
  special: boolean;
}

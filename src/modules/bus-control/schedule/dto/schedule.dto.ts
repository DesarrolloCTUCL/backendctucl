import { IsInt, IsString, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
  @ApiProperty({ example: 101, description: 'ID del vehículo asignado' })
  @IsInt()
  vehicle_id: number;

  @ApiProperty({ example: '2025-08-29', description: 'Fecha del despacho' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 'Ruta Las Pitas - El Rosal', description: 'Itinerario del bus' })
  @IsString()
  itinerary: string;

  @ApiProperty({ example: 12, description: 'ID de la línea' })
  @IsInt()
  line_id: number;

  @ApiProperty({ example: 7, description: 'ID del usuario que asigna el despacho' })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 55, description: 'ID del conductor asignado' })
  @IsInt()
  driver: number;

  @ApiProperty({ example: 'Despacho asignado sin novedades', description: 'Observaciones' })
  @IsOptional()
  @IsString()
  observations?: string;
}

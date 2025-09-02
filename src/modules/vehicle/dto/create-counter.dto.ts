import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Min, IsOptional, IsString } from 'class-validator';

export class CreateCounterDto {
  @IsInt()
  @Min(0)
  @ApiProperty({ description: 'Número de pasajeros contados', example: 1523 })
  passengers: number;

  @IsString()
  @ApiProperty({ description: 'Fecha de inicio', example: '2025-07-18 15:02:57.415272' })
  start_time: string;

  @IsString()
  @ApiProperty({ description: 'Fecha final', example: '2025-07-18 15:02:57.415272' })
  end_time: string;

  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'ID del bus', example: 5 })
  bus_id: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    description: 'ID del itinerario (opcional). Si no existe será null/omitido',
    example: 12,
    nullable: true,
  })
  itinerary_id?: number | null;
}
export class CreateVehicleDto extends CreateCounterDto {}

import { IsNumber, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetTrackGpsDto {
  @Type(() => Number) // 👈 fuerza la conversión a número
  @IsNumber()
  device_id: number;

  @IsDateString()
  start: string;

  @IsDateString()
  end: string;
}

// src/modules/gps/dto/create-gps.dto.ts
import { IsString, IsNumber, IsDateString } from 'class-validator';
import { IsOptional } from 'class-validator';

export class CreateGpsDto {
  @IsString()
  device_id: string;

  @IsDateString()
  timestamp: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;

  @IsNumber()
  @IsOptional()
  speed?: number;
}
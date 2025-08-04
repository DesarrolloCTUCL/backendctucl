import { IsNotEmpty, IsString, IsOptional, Matches } from 'class-validator';

export class CreateControlStripDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, { message: 'Invalid start time format (expected HH:mm or HH:mm:ss)' })
  startTime: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, { message: 'Invalid end time format (expected HH:mm or HH:mm:ss)' })
  endTime: string;

  @IsNotEmpty()
  @IsString()
  chainStrip: string; // ej: "12,14,43"
}

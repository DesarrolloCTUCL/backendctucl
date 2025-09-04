// itinerary/dto/update-itinerary.dto.ts
import { IsString, IsNotEmpty, IsNumberString, IsNumber } from 'class-validator';

export class UpdateItineraryDto {
  @IsString()
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @IsNotEmpty()
  end_time: string;

  @IsString()
  @IsNotEmpty()
  route: string;

  @IsNumber(
    { maxDecimalPlaces: 2 }, // hasta 2 decimales
  )
  @IsNotEmpty()
  km_traveled: number;
  @IsNumberString()
  @IsNotEmpty()
  shift_id : string;

  // Puedes agregar más si deseas
}

// itinerary/dto/update-itinerary.dto.ts
import { IsString, IsNotEmpty, IsNumberString } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  km_traveled: string;

  @IsNumberString()
  @IsNotEmpty()
  shift_id : string;

  // Puedes agregar más si deseas
}

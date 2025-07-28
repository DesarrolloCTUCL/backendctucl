// itinerary/dto/update-itinerary.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateItineraryDto {
  @IsString()
  @IsNotEmpty()
  start_time: string; // formato esperado 'HH:mm:ss'

  @IsString()
  @IsNotEmpty()
  end_time: string; // formato esperado 'HH:mm:ss'
}

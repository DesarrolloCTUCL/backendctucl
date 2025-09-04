import { Type } from 'class-transformer';
import { ValidateNested, IsArray, IsString, IsNotEmpty } from 'class-validator';
import { UpdateItineraryDto } from './update-itinerary.dto';

export class UpdateItineraryWithCodeDto extends UpdateItineraryDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class BulkUpdateItineraryDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateItineraryWithCodeDto)
  itineraries: UpdateItineraryWithCodeDto[];
}

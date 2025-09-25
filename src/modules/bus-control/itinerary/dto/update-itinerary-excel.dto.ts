// itinerary/dto/update-itinerary-excel.dto.ts
import { Type } from 'class-transformer';
import { ValidateNested, IsArray, IsString, IsNotEmpty } from 'class-validator';
import { UpdateItineraryDto } from './update-itinerary.dto';

export class UpdateItineraryWithCodeDto extends UpdateItineraryDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  // 🔹 Nueva propiedad para agrupar y resetear
  @IsString()
  @IsNotEmpty()
  itinerary: string;
}

export class BulkUpdateItineraryDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateItineraryWithCodeDto)
  itineraries: UpdateItineraryWithCodeDto[];
}

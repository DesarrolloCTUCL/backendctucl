import {
    IsNotEmpty,
    IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';


export class UpdateVehicleGpsDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    latitude: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    longitude: number;
}

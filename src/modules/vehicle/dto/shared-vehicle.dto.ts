import {
    IsNotEmpty,
    IsOptional,
    IsInt,
    IsDate,
    IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SharedVehicleDto {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty({ description: 'Registro del bus (Vehicle)', example: 1734 })
    register_vehicle: number;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty({ description: 'Id Del usuario', example: 17 })
    user_id: number;
}

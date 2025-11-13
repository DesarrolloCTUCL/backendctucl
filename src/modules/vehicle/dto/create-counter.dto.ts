import {
	IsNotEmpty,
	IsOptional,
	IsInt,
	IsDate,
	IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePassengerCounterDto {
	@IsInt()
	@IsNotEmpty()
	@ApiProperty({ description: 'ID del bus (Vehicle)', example: 1734 })
	register_vehicle: number;


	@IsInt()
	@IsNotEmpty()
	@ApiProperty({ description: 'ID del bus (Vehicle)', example: 1734 })
	passengers: number;

}

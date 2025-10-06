import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  card_code: string;

  @IsString()
  @IsNotEmpty()
  card_type: string;

  @IsString()
  @IsNotEmpty()
  card_date: string;

  @IsString()
  @IsNotEmpty()
  card_time: string;

  @IsDateString()
  @Type(() => Date)
  date: Date;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  amount: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  balance: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  last_balance: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 7 })
  @Type(() => Number)
  latitude?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 7 })
  @Type(() => Number)
  longitude?: number;
}

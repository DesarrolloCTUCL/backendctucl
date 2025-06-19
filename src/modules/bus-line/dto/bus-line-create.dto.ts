import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateBusLineDto {
  @ApiProperty({
    description: 'Número identificador de la línea',
    example: 1,
  })
  @IsNotEmpty()
  number: number;

  @ApiProperty({
    description: 'Nombre de la línea de bus',
    example: 'L-2',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Breve descripción de la línea',
    example: 'La línea va de Sauces Norte hasta La Argelia',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}

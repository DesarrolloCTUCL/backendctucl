import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class UpdateTimesDto {
  @ApiProperty({
    description: 'Cadena con los tiempos entre puntos de control separados por comas',
    example: '0,2,4,4,4,6,4,4,3,5,7,4,5,1',
  })
  @IsString()
  @Matches(/^(\s*\d+\s*)(,\s*\d+\s*)*$/, {
    message: "El formato de 'times' debe ser una lista de números separados por comas (por ejemplo: 1,2,3,4)",
  })
  times: string;
}

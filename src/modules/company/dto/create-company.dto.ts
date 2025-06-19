import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    example: 'URBASUR',
    description: 'Nombre de la compañía',
  })
  @IsString()
  name: string;
}

import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({
    example: 'email@gmail.com',
    description: 'Correo de la cuenta',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @MinLength(8)
  @IsString()
  password: string;
}

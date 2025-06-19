import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class ValidateUserDto {
  @ApiProperty({ example: false, description: 'Nombre de usuario' })
  exists: boolean;

  @ApiProperty({ example: { username: 'johndoe', password: 'securepassword123' }, description: 'datos del usuario' })
  data: any |null;
}
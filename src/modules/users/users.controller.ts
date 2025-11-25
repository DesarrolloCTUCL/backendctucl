import { Controller,Post, Body, Get, UseGuards, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }
	// si el endpoint va a ser publico descomentar esta linea, caso contrario estara protegida
	// @Public()
	@Post('/register')
	@ApiOperation({ summary: 'registrar al usuario' })
	@ApiResponse({
		status: 200,
		description: 'Devuelve el usuario registrado'
	})
	async register(@Body() registerUserDto: RegisterUserDto) {
		return await this.usersService.registerUser(registerUserDto);
	}


	@Get()
	@ApiOperation({ summary: 'Obtener usuarios' })
	async getUsers(
		@Query('page') page?: number,
		@Query('limit') limit?: number,
	){
		return await this.usersService.getUsers(page , limit)
	}


	
}

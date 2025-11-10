import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';



@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }
	@Post('/register')
	@ApiOperation({ summary: 'registrar al usuario' })
	@ApiResponse({
		status: 200,
		description: 'Devuelve el usuario registrado'
	})
	async register(@Body() registerUserDto: RegisterUserDto) {
		return await this.usersService.registerUser(registerUserDto);
	}

	
}

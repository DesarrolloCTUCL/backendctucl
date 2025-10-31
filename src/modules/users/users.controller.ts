import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/database/entities/user.entity';



@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findUserById(id);
	}

	@Post('/admin')
	@ApiOperation({
		summary: 'Crear una cuenta de usuario desde el panel de administración',
	})
	@ApiResponse({
		status: 201,
		description:
			'La cuenta de usuario con administrador fue creada exitosamente',
		type: User,
	})
	async createFromAdmin(
		
	) {
		return await {}
	}
}

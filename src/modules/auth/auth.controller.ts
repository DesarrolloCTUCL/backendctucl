import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
    @Post('/login')
    @ApiOperation({ summary: 'Login' })
    @ApiResponse({
        status: 200,
        description: 'Your new Token',
    })
    @HttpCode(200)
    async login(@Body() loginAuthDto: LoginAuthDto) {
        return await this.authService.login(loginAuthDto);
    }


}
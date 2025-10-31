import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) {}
    async login (dto: LoginAuthDto) {
        const { email, password } = dto;
    }
}
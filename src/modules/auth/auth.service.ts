import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { AppConfigService } from 'src/config/config.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private appConfigService: AppConfigService,
         private jwtService: JwtService,
    ) { }
    async login(loginAuthDto: LoginAuthDto) {
        const { email, password } = loginAuthDto;
        const foundedUser = await this.usersService.findByEmail(email);

        if (!foundedUser)
        throw new HttpException(
            'Ups! Parece que no tienes un plan activo. Activa un plan ahora.',
            HttpStatus.NOT_FOUND,
        );

        const checkPassword = await compare(password, foundedUser.password);

        if (!checkPassword)
        throw new HttpException(
            'Correo o contraseña incorrectos',
            HttpStatus.FORBIDDEN,
        );

        const secretKey = await this.appConfigService.crypto.jwt.secret

        const payload = {
            id: foundedUser.id,
            email: foundedUser.email,
            account_type: foundedUser.role,
        };

        const token = this.jwtService.sign(payload, {
            secret: secretKey,
            expiresIn: this.appConfigService.crypto.jwt.expiration, 
        });

        return {
            message: 'Inicio de sesión exitoso',
            result: {
                id: foundedUser.id,
                name: foundedUser.name,
                lastname: foundedUser.lastname,
                email: foundedUser.email,
                birthdate: foundedUser.birthdate,
                dni: foundedUser.dni,
                role: foundedUser.role,
                profile: foundedUser.profile,
                gender: foundedUser.gender,
                token,
            },
        };
    }


}
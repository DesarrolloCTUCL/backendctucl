import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

        if (!foundedUser){
            throw new NotFoundException();
        }
        const checkPassword = await compare(password, foundedUser.password);

        if (!checkPassword){
            throw new UnauthorizedException(
                'Correo o contraseña incorrectos',
            );
        }

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
            statusCode:200,
            result: {
                user:{
                    id: foundedUser.id,
                    name: foundedUser.name,
                    lastname: foundedUser.lastname,
                    email: foundedUser.email,
                    birthdate: foundedUser.birthdate,
                    dni: foundedUser.dni,
                    role: foundedUser.role,
                    profile: foundedUser.profile,
                    gender: foundedUser.gender,
                    phone:foundedUser.phone,
                    address:foundedUser.address,
                    company:foundedUser.company
                },
                token:token
            },
        };
    }


}
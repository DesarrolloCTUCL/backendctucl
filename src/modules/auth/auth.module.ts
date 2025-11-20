import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { AppConfigModule } from 'src/config/config.module';

@Module({
    imports:[UsersModule,UsersModule,AppConfigModule],
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy],
})
export class AuthModule {};
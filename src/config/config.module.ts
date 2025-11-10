import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';
import * as Joi from 'joi';
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles en toda la app
      envFilePath: '.env', // Ruta del archivo de variables de entorno
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string().valid('development', 'production', 'local').default('local'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().min(10).required(),
      }),
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService], // Permite inyectarlo en otros módulos
})
export class AppConfigModule {}
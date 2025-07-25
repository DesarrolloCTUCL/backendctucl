import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ResponseInterceptor } from './common/filters/response.interceptor';
import { GlobalHttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Activar validación automática y transformación de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // elimina propiedades no definidas en DTO
      forbidNonWhitelisted: true,   // rechaza propiedades extras y lanza error
      transform: true,              // transforma tipos (ej: string a Date)
    }),
  );

  app.use(cookieParser());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new GlobalHttpExceptionFilter());

  const whitelist = [
    'http://localhost:3000',
    'https://ctucl-manager-frontend.vercel.app',
    'https://frontendctucl.vercel.app',
    'https://frontendctucl-8yopp2yp9-desarrolloctucls-projects.vercel.app',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('CTUCL SIMTRA API')
    .setDescription('Api para el sistema SIMTRA de control de flota y gestion del consorcio')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

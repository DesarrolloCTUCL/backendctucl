import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { AppLoggerService } from './common/logger/app-logger.service';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

// ✅ Interceptores correctos
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ErrorFilter } from './interceptors/error.filter';

async function bootstrap() {
  const logger = new AppLoggerService();
  logger.setLogLevelsByEnv(process.env.NODE_ENV || 'development');

  const app = await NestFactory.create(AppModule, {
    logger,
    bufferLogs: true,
  });

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4000',
      'https://ctucl-manager-frontend.vercel.app',
      'https://frontendctucl.vercel.app',
      'https://frontendctucl-8yopp2yp9-desarrolloctucls-projects.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: false,
      exceptionFactory: (errors) => {
        const messages = errors.flatMap((e) =>
          e.constraints ? Object.values(e.constraints) : []
        );
        return new BadRequestException(messages);
      },
    }),
  );

  // ✅ Interceptores globales (orden correcto)
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseInterceptor()
  );

  // ✅ Filtro global EXISTENTE
  app.useGlobalFilters(new ErrorFilter());

  const config = new DocumentBuilder()
    .setTitle('CTUCL SIMTRA API')
    .setDescription('Api para el sistema SIMTRA de control de flota y gestion del consorcio')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  logger.log('App is starting...');
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

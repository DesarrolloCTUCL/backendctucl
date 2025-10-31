import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { AppLoggerService } from './common/logger/app-logger.service';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
async function bootstrap() {
  const logger = new AppLoggerService();
  logger.setLogLevelsByEnv(process.env.NODE_ENV || 'development');

  const app = await NestFactory.create(AppModule, {
    logger,
    bufferLogs: true,
  });


  app.setGlobalPrefix('api');
  // Activar validación automática y transformación de DTOs
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,              // elimina propiedades no definidas en DTO
  //     forbidNonWhitelisted: true,   // rechaza propiedades extras y lanza error
  //     transform: true,              // transforma tipos (ej: string a Date)
  //   }),
  // );

  // app.use(cookieParser());
  // app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalFilters(new GlobalHttpExceptionFilter());

  // const whitelist = [
  //   'http://localhost:3000', 
  //   'http://localhost:4000',
  //   'https://ctucl-manager-frontend.vercel.app',
  //   'https://frontendctucl.vercel.app',
  //   'https://frontendctucl-8yopp2yp9-desarrolloctucls-projects.vercel.app',
  // ];

  // app.enableCors({
  //   origin: (origin, callback) => {
  //     if (!origin || whitelist.includes(origin)) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error(`Origin ${origin} not allowed by CORS`));
  //     }
  //   },
  //   credentials: true,
  // });


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
      whitelist: true,              // elimina props no definidas en el DTO
      forbidNonWhitelisted: true,   // lanza error si llegan props extra
      transform: true,              // castea tipos básicos si corresponde
      stopAtFirstError: false,      // recoge todos los errores (no solo el primero)
      exceptionFactory: (errors) => {
        // aplanar mensajes de constraints
        const messages = errors.flatMap(e =>
          e.constraints ? Object.values(e.constraints) : []
        );
        return new BadRequestException(messages);
      },
    }),
  );
app.useGlobalFilters(new  AllExceptionsFilter(logger));
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

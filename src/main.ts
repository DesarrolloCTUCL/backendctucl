import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ResponseInterceptor } from './common/filters/response.interceptor';
import { GlobalHttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new GlobalHttpExceptionFilter());

  // Deshabilitar CORS completamente
  app.enableCors({
    origin: ['http://localhost:3000','https://ctucl-manager-frontend.vercel.app','*'], // 👈 Permite el frontend
    credentials: true, //
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

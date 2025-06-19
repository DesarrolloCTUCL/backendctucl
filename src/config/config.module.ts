import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';
import { configValidationSchema } from './config.schema';
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles en toda la app
      envFilePath: '.env', // Ruta del archivo de variables de entorno
      validationSchema: configValidationSchema,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService], // Permite inyectarlo en otros módulos
})
export class AppConfigModule {
  constructor(
    private readonly appConfig: AppConfigService,
  ) {

  }
}
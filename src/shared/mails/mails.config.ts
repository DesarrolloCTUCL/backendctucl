
import { MailerOptions } from '@nestjs-modules/mailer';
import { AppConfigService } from 'src/config/config.service';

export const getmailsConfig = (
  configService: AppConfigService,
): MailerOptions => {
  if (!configService.config.email) {
    throw new Error('Email configuration is not defined');
  }

  return {
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: configService.config.email.email_user,
        pass: configService.config.email.email_password,
      },
    },
    defaults: {
      from: `Simtra <no-reply@simtra.app>`,
    },
  };
};

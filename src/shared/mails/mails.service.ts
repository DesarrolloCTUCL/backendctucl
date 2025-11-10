import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateMailDto } from './dto/create-mail.dto';

@Injectable()
export class MailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(createMailDto: CreateMailDto) {
    return new Promise(async (resolve, reject) => {
      await this.mailerService
        .sendMail({
          to: createMailDto.to,
          subject: createMailDto.subject,
          html: createMailDto.html,
        })
        .then(() => resolve(true))
        .catch(() => reject(false));
    });
  }
}

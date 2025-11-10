export class CreateMailDto {
  to: string | string[];
  subject: string;
  html: string;
}

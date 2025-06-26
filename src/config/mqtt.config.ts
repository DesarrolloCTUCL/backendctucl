import { join } from 'path';

export const certsPath = {
  key: join(process.cwd(), 'certs', 'private.pem.key'),
  cert: join(process.cwd(), 'certs', 'certificate.pem.crt'),
  ca: join(process.cwd(), 'certs', 'AmazonRootCA1.pem'),
};
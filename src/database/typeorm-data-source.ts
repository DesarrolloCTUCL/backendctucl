import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config(); // carga variables del .env

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/database/entities/*.entity.{ts,js}'],
  migrations:
    process.env.NODE_ENV === 'production'
      ? ['src/database/migrations/migrations-prod/*.ts']
      : process.env.NODE_ENV === 'local'
        ? ['src/database/migrations/migrations-local/*.ts']
        : ['src/database/migrations/migrations-dev/*.ts'],
  synchronize: false,
  ssl: process.env.DB_SSL === 'true'
    ? { rejectUnauthorized: false }
    : false,
});

import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  db: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
}));

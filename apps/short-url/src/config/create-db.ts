import { createDatabase } from 'typeorm-extension';

export async function createDb() {
  await createDatabase({
    options: {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    initialDatabase: 'postgres',
    ifNotExist: true,
  });
}

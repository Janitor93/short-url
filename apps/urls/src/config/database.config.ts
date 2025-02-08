import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
<<<<<<< HEAD
import { Url } from '../url/url.entity';
=======
>>>>>>> c081387 (refactor(folder-structure): refactor folder structure)

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
<<<<<<< HEAD
    port: parseInt(process.env.DB_PORT),
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    entities: [Url],
=======
    port: Number(process.env.DB_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
>>>>>>> c081387 (refactor(folder-structure): refactor folder structure)
    autoLoadEntities: true,
    synchronize: true,
  }),
);

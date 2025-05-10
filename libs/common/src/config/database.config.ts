import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default function databaseOptions(type: 'mongodb' | 'postgres'): TypeOrmModuleOptions {
  if (type === 'postgres') {
    return {
      type,
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }
  }
  return {
    type,
    host: process.env.MONGO_HOST,
    port: Number(process.env.MONGO_PORT),
    username: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    database: process.env.MONGO_INITDB_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
    url: process.env.MONGODB_URI,
  };
}

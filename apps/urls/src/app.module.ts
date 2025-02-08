import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
<<<<<<< HEAD
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
=======

import appConfig from './config/app.config';
>>>>>>> c081387 (refactor(folder-structure): refactor folder structure)
import { UrlModule } from './url/url.module';
import { GlobalModule } from './global/global.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';

@Module({
  imports: [
<<<<<<< HEAD
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig, databaseConfig] }),
    UrlModule,
    TypeOrmModule.forRoot(databaseConfig()),
=======
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    UrlModule,
>>>>>>> c081387 (refactor(folder-structure): refactor folder structure)
    GlobalModule,
    RedisCacheModule,
  ],
})
export class AppModule {}

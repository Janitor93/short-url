import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { UrlModule } from './url/url.module';
import { GlobalController } from './global/global.controller';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig, databaseConfig] }),
    UrlModule,
    TypeOrmModule.forRoot(databaseConfig()),
    GlobalModule,
  ],
  controllers: [GlobalController],
})
export class AppModule {}

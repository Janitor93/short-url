import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './config/app.config';
import { UrlModule } from './url/url.module';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    UrlModule,
    GlobalModule,
  ],
})
export class AppModule {}

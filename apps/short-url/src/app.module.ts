import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { LoggingInterceptor, HttpExceptionFilter, LoggerModule } from '@app/common';

import { appConfig } from './config';
import { UrlModule } from './url/url.module';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [
    UrlModule,
    GlobalModule,
    LoggerModule.registry(appConfig.logger.namespace),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

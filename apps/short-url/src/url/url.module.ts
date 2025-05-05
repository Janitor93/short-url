import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { DatabaseModule, RedisModule, DecodeTokenMiddleware } from '@app/common';
import { JwtService } from '@nestjs/jwt';

import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { Url } from './url.entity';
import { UrlRepository } from './url.repository';
import { appConfig } from '../config';

@Module({
  imports: [
    DatabaseModule.forRoot([Url]),
    RedisModule.register(appConfig.cache.namespace)
  ],
  controllers: [UrlController],
  providers: [UrlService, UrlRepository, JwtService],
  exports: [UrlService],
})
export class UrlModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecodeTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.POST });
  }
}

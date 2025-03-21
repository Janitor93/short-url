import { Module } from '@nestjs/common';
import { DatabaseModule, RedisModule, LoggerModule } from '@app/common';

import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { Url } from './url.entity';
import { UrlRepository } from './url.repository';

@Module({
  imports: [
    DatabaseModule.forRoot([Url]),
    RedisModule.register('url'),
    LoggerModule.registry('url')
  ],
  controllers: [UrlController],
  providers: [UrlService, UrlRepository],
  exports: [UrlService],
})
export class UrlModule {}

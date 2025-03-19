import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';

import { RedisCacheModule } from '../redis-cache/redis-cache.module';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { Url } from './url.entity';
import { UrlRepository } from './url.repository';

@Module({
  imports: [DatabaseModule.forRoot([Url]), RedisCacheModule],
  controllers: [UrlController],
  providers: [UrlService, UrlRepository],
  exports: [UrlService],
})
export class UrlModule {}

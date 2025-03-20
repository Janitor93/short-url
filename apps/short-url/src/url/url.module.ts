import { Module } from '@nestjs/common';
import { DatabaseModule, RedisModule } from '@app/common';

import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { Url } from './url.entity';
import { UrlRepository } from './url.repository';

@Module({
  imports: [DatabaseModule.forRoot([Url]), RedisModule],
  controllers: [UrlController],
  providers: [UrlService, UrlRepository],
  exports: [UrlService],
})
export class UrlModule {}

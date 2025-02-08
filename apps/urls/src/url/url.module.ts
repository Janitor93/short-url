import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RedisCacheModule } from '../redis-cache/redis-cache.module';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { Url } from './url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Url]), RedisCacheModule],
  controllers: [UrlController],
  providers: [UrlService],
  exports: [UrlService],
})
export class UrlModule {}

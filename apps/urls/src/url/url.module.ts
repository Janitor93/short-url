import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { TypeOrmModule } from '@nestjs/typeorm';
=======
import { DatabaseModule } from '@app/common';
>>>>>>> c081387 (refactor(folder-structure): refactor folder structure)

import { RedisCacheModule } from '../redis-cache/redis-cache.module';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { Url } from './url.entity';
<<<<<<< HEAD

@Module({
  imports: [TypeOrmModule.forFeature([Url]), RedisCacheModule],
  controllers: [UrlController],
  providers: [UrlService],
=======
import { UrlRepository } from './url.repository';

@Module({
  imports: [DatabaseModule.forRoot([Url]), RedisCacheModule],
  controllers: [UrlController],
  providers: [UrlService, UrlRepository],
>>>>>>> c081387 (refactor(folder-structure): refactor folder structure)
  exports: [UrlService],
})
export class UrlModule {}

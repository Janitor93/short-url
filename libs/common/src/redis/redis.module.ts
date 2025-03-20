import { Module, DynamicModule, Provider } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RedisService } from './redis.service';
import { PREFIX_TOKEN } from './constants';

@Module({})
export class RedisModule {
  static register(prefix: string): DynamicModule {
    const prefixProvider: Provider = {
      provide: PREFIX_TOKEN,
      useValue: prefix,
    };

    return {
      module: RedisModule,
      imports: [
        CacheModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            store: redisStore,
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            ttl: configService.get('CACHE_TTL'),
            max: configService.get('MAX_ITEM_IN_CACHE'),
          }),
        }),
      ],
      providers: [RedisService, prefixProvider],
      exports: [RedisService],
    };
  }
}

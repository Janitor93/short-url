import { Module, DynamicModule, Provider } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RedisService } from './redis.service';
import { PREFIX_TOKEN } from './constants';
import cacheConfig from '../config/cache.config';

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
          useFactory: async () => cacheConfig(),
        }),
      ],
      providers: [RedisService, prefixProvider],
      exports: [RedisService],
    };
  }
}

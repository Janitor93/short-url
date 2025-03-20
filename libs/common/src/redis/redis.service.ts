import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

import { PREFIX_TOKEN } from './constants';

@Injectable()
export class RedisService {
  constructor(
    @Inject(PREFIX_TOKEN) private readonly service: string,
    @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {}

  private getKey(key: string): string {
    return `${this.service}/${key}`;
  }

  async get<T>(key: string): Promise<T> {
    return await this.cache.get(this.getKey(key));
  }

  async set(key: string, value: unknown) {
    await this.cache.set(this.getKey(key), value);
  }

  async del(key) {
    await this.cache.del(this.getKey(key));
  }
}

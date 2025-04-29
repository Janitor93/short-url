import { registerAs } from '@nestjs/config';
import { CacheModuleOptions } from '@nestjs/cache-manager';

export default registerAs(
  'cache',
  (): CacheModuleOptions => ({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    ttl: Number(process.env.CACHE_TTL),
    max: process.env.MAX_ITEM_IN_CACHE,
  }),
);

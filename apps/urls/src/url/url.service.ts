import { Injectable, NotFoundException } from '@nestjs/common';
<<<<<<< HEAD
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';

import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { Url } from './url.entity';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
=======
import { nanoid } from 'nanoid';

import { RedisCacheService } from '../redis-cache/redis-cache.service';
import { Url } from './url.entity';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UrlRepository } from './url.repository';
>>>>>>> c081387 (refactor(folder-structure): refactor folder structure)

@Injectable()
export class UrlService {
  constructor(
<<<<<<< HEAD
    @InjectRepository(Url) private readonly urlRepository: Repository<Url>,
=======
    private readonly urlRepository: UrlRepository,
>>>>>>> c081387 (refactor(folder-structure): refactor folder structure)
    private readonly cacheManager: RedisCacheService,
  ) {}

  private async getRecordFromCache(code: string): Promise<Url | null> {
    const result = await this.cacheManager.get<Url>(code);
    return result;
  }

  async createShortUrl({ originalUrl }: CreateShortUrlDto): Promise<Url> {
    const code = nanoid(7);
    const record = await this.urlRepository.findOne({ where: { originalUrl } });
    if (record) return record;
<<<<<<< HEAD
    const urlRecord = this.urlRepository.create({ code, originalUrl });
    const result = await this.urlRepository.save(urlRecord);
    this.cacheManager.set(urlRecord.code, result);
    return result;
=======
    const urlRecord = await this.urlRepository.save({ code, originalUrl });
    this.cacheManager.set(urlRecord.code, urlRecord);
    return urlRecord;
>>>>>>> c081387 (refactor(folder-structure): refactor folder structure)
  }

  async getUrlInfo(code: string): Promise<Url> {
    const cacheResult = await this.getRecordFromCache(code);
    if (cacheResult) return cacheResult;
    const urlInfo = await this.urlRepository.findOne({ where: { code } });
    if (!urlInfo) throw new NotFoundException();
    return urlInfo;
  }

  async getOriginalUrl(code: string): Promise<string> {
    const urlInfo = await this.getUrlInfo(code);
    return urlInfo.originalUrl;
  }
}

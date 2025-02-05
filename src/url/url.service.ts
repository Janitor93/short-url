import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';

import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { Url } from './url.entity';
import { CreateShortUrlDto } from './dto/create-short-url.dto';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url) private readonly urlRepository: Repository<Url>,
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
    const urlRecord = this.urlRepository.create({ code, originalUrl });
    const result = await this.urlRepository.save(urlRecord);
    this.cacheManager.set(urlRecord.code, result);
    return result;
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

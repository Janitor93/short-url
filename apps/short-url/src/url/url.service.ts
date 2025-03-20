import { Injectable, NotFoundException } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { RedisService } from '@app/common';

import { Url } from './url.entity';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UrlRepository } from './url.repository';

@Injectable()
export class UrlService {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly cacheManager: RedisService,
  ) {}

  private async getRecordFromCache(code: string): Promise<Url | null> {
    const result = await this.cacheManager.get<Url>(code);
    return result;
  }

  async createShortUrl({ originalUrl }: CreateShortUrlDto): Promise<Url> {
    const code = nanoid(7);
    let urlRecord = await this.urlRepository.findOne({ where: { originalUrl } });
    if (!urlRecord) {
      urlRecord = await this.urlRepository.save({ code, originalUrl });
    }
    this.cacheManager.set(urlRecord.code, urlRecord);
    return urlRecord;
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

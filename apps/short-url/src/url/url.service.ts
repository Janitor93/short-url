import { Injectable, NotFoundException } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { RedisService, LoggerService } from '@app/common';

import { Url } from './url.entity';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UrlRepository } from './url.repository';

@Injectable()
export class UrlService {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly cacheManager: RedisService,
    private readonly logger: LoggerService,
  ) {}

  private async getRecordFromCache(code: string): Promise<Url | null> {
    const result = await this.cacheManager.get<Url>(code);
    return result;
  }

  async createShortUrl({ originalUrl }: CreateShortUrlDto): Promise<Url> {
    try {
      const code = nanoid(7);
      let urlRecord = await this.urlRepository.findOne({ where: { originalUrl } });
      if (!urlRecord) {
        urlRecord = await this.urlRepository.save({ code, originalUrl });
      }
      this.cacheManager.set(urlRecord.code, urlRecord);
      this.logger.log(`Short url created: ${urlRecord.code}`);
      return urlRecord;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getUrlInfo(code: string): Promise<Url> {
    try {
      const cacheResult = await this.getRecordFromCache(code);
      if (cacheResult) {
        this.logger.log(`Short url ${code} has found in cache`);
        return cacheResult;
      }
      const urlInfo = await this.urlRepository.findOne({ where: { code } });
      if (!urlInfo) throw new NotFoundException();
      this.logger.log(`Short url ${code} successfully found`);
      return urlInfo;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getOriginalUrl(code: string): Promise<string> {
    try {
      const urlInfo = await this.getUrlInfo(code);
      this.logger.log(`Short url ${code} successfully found`);
      return urlInfo.originalUrl;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';

import { Url } from './url.entity';
import { CreateShortUrlDto } from './dto/create-short-url.dto';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url) private readonly urlRepository: Repository<Url>,
  ) {}

  async createShortUrl({ originalUrl }: CreateShortUrlDto): Promise<Url> {
    const code = nanoid(7);
    const record = await this.urlRepository.findOne({ where: { code } });
    if (record) return record;
    const urlRecord = this.urlRepository.create({ code, originalUrl });
    return await this.urlRepository.save(urlRecord);
  }

  async getUrlInfo(code: string): Promise<Url> {
    const urlInfo = await this.urlRepository.findOne({ where: { code } });
    if (!urlInfo) throw new NotFoundException();
    return urlInfo;
  }

  async getOriginalUrl(code: string): Promise<string> {
    const urlInfo = await this.getUrlInfo(code);
    return urlInfo.originalUrl;
  }
}

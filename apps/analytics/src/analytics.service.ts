import { Injectable, ConflictException } from '@nestjs/common';
import { Pagination } from '@app/common';

import { UrlStatRepository } from './repositories/analytics.repository';
import { CountryRepository } from './repositories/country.repository';
import { UrlAnalytics } from './interfaces';
import { UrlStat } from './entities/url-stat.entity';
import { appConfig } from './config';
import { GeoIpService } from './geoip/geoip.service';
import { CreateUrlAnalyticsDto } from './dto';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly urlStatRepository: UrlStatRepository,
    private readonly countryRepository: CountryRepository,
    private readonly geoIpService: GeoIpService,
  ) {}

  async getCountryByIp(ip: string): Promise<string> {
    const data = await this.geoIpService.getIpData(ip);
    return data.country;
  }

  async createUrlAnalytics({ userId, urlId, ip }: CreateUrlAnalyticsDto): Promise<UrlAnalytics> {
    const record = await this.urlStatRepository.findAll({ userId, urlId });
    let country = null;
    if (record.data.length) throw new ConflictException('Analytics already exists');
    if (ip) country = await this.getCountryByIp(ip);
    return await this.urlStatRepository.save({ userId, urlId, country });
  }

  async incrementClicks(id: string, ip?: string): Promise<void> {
    await this.urlStatRepository.increment(id);
    if (ip) {
      const country = await this.getCountryByIp(ip);
      await this.countryRepository.findAndUpdate(country);
    }
  }

  async getUserAnalytics(userId: string, page: number = 1): Promise<Pagination<UrlStat>> {
    return await this.urlStatRepository.findAll({ userId }, page, appConfig.pagination.limit);
  }
}

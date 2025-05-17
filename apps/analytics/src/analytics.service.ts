import { Injectable, ConflictException } from '@nestjs/common';
import { Pagination } from '@app/common';

import { AnalyticsRepository } from './analytics.repository';
import { UrlAnalytics } from './interfaces';
import { Analytics } from './analytics.entity';
import { appConfig } from './config';
import { GeoIpService } from './geoip/geoip.service';
import { CreateUrlAnalyticsDto } from './dto';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly analyticsRepository: AnalyticsRepository,
    private readonly geoIpService: GeoIpService,
  ) {}

  async getCountryByIp(ip: string): Promise<string> {
    const data = await this.geoIpService.getIpData(ip);
    return data.country;
  }

  async createUrlAnalytics({ userId, urlId, ip }: CreateUrlAnalyticsDto): Promise<UrlAnalytics> {
    const record = await this.analyticsRepository.findAll({ userId, urlId });
    let country = null;
    if (record.data.length) throw new ConflictException('Analytics already exists');
    if (ip) country = await this.getCountryByIp(ip);
    return await this.analyticsRepository.save({ userId, urlId, country });
  }

  async incrementClicks(id: string): Promise<void> {
    await this.analyticsRepository.increment(id);
  }

  async getUserAnalytics(userId: string, page: number = 1): Promise<Pagination<Analytics>> {
    return await this.analyticsRepository.findAll({ userId }, page, appConfig.pagination.limit);
  }
}

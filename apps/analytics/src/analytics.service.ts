import { Injectable, ConflictException } from '@nestjs/common';
import { Pagination } from '@app/common';

import { AnalyticsRepository } from './analytics.repository';
import { UrlAnalytics } from './interfaces';
import { Analytics } from './analytics.entity';
import { appConfig } from './config';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly analyticsRepository: AnalyticsRepository,
  ) {}

  async getCountryByIp(): Promise<void> {
    throw new Error('Not implemented yet');
  }

  async createUrlAnalytics({ userId, urlId }: UrlAnalytics): Promise<UrlAnalytics> {
    const record = await this.analyticsRepository.findAll({ userId, urlId });
    if (record.data.length) throw new ConflictException('Analytics already exists');
    return await this.analyticsRepository.save({ userId, urlId });
  }

  async incrementClicks(id: string): Promise<void> {
    await this.analyticsRepository.increment(id);
  }

  async getUserAnalytics(userId: string, page: number = 1): Promise<Pagination<Analytics>> {
    return await this.analyticsRepository.findAll({ userId }, page, appConfig.pagination.limit);
  }
}

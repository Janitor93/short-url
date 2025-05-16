import { Injectable, ConflictException } from '@nestjs/common';

import { AnalyticsRepository } from './analytics.repository';
import { UrlAnalytics } from './interfaces';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly analyticsRepository: AnalyticsRepository,
  ) {}

  async getCountryByIp(): Promise<void> {
    throw new Error('Not implemented yet');
  }

  async createUrlAnalytics({ userId, urlId }: UrlAnalytics): Promise<UrlAnalytics> {
    const record = await this.analyticsRepository.findAll({ where: { userId, urlId }});
    if (record.length) throw new ConflictException('Analytics already exists');
    return await this.analyticsRepository.save({ userId, urlId });
  }

  async incrementClicks(id: string): Promise<void> {
    await this.analyticsRepository.increment(id);
  }
}

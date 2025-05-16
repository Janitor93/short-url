import { Injectable } from '@nestjs/common';

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
    return await this.analyticsRepository.save({ userId, urlId });
  }
}

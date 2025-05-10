import { Injectable } from '@nestjs/common';

import { AnalyticsRepository } from './analytics.repository';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly analyticsRepository: AnalyticsRepository,
  ) {}

  getHello(): string {
    this.analyticsRepository.save({ urlId: '1', clicks: 1 });
    return 'Hello World!';
  }
}

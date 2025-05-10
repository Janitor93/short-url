import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';

import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { Analytics } from './analytics.entity';
import { AnalyticsRepository } from './analytics.repository';

@Module({
  imports: [DatabaseModule.forRoot({ type: 'mongodb', entities: [Analytics] })],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsRepository],
})
export class AnalyticsModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from '@app/common';

import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { Analytics } from './analytics.entity';
import { AnalyticsRepository } from './analytics.repository';
import { appConfig } from './config';
import { GeoIpModule } from './geoip/geoip.module';

@Module({
  imports: [
    DatabaseModule.forRoot({ type: 'mongodb', entities: [Analytics] }),
    LoggerModule.registry(appConfig.logger.namespace),
    GeoIpModule,
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsRepository],
})
export class AnalyticsModule {}

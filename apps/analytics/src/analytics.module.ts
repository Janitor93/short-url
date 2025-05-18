import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from '@app/common';

import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { UrlStat } from './entities/url-stat.entity';
import { UrlStatRepository } from './repositories/analytics.repository';
import { CountryRepository } from './repositories/country.repository';
import { appConfig } from './config';
import { GeoIpModule } from './geoip/geoip.module';
import { Country } from './entities/country.entity';

@Module({
  imports: [
    DatabaseModule.forRoot({ type: 'mongodb', entities: [UrlStat, Country] }),
    LoggerModule.registry(appConfig.logger.namespace),
    GeoIpModule,
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, UrlStatRepository, CountryRepository],
})
export class AnalyticsModule {}

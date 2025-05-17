import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { GeoIpService } from './geoip.service';

@Module({
  imports: [HttpModule],
  providers: [GeoIpService],
  exports: [GeoIpService],
})
export class GeoIpModule {}

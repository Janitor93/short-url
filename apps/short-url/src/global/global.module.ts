import { Module } from '@nestjs/common';

import { UrlModule } from '../url/url.module';
import { GlobalController } from './global.controller';

@Module({
  imports: [UrlModule],
  controllers: [GlobalController],
})
export class GlobalModule {}

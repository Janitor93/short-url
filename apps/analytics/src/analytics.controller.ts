import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@app/common';

import { AnalyticsService } from './analytics.service';
import { CreateUrlAnalyticsDto } from './dto';


@Controller('analytics')
@UseFilters(HttpExceptionFilter)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('/url')
  @ApiOperation({
    summary: 'Create url analytics',
    description: `Initial point to count analytics.
      The route creates a record and later this record is used for incrementing counters`
  })
  @ApiResponse({
    status: 200,
    description: 'Record was created successful'
  })
  async createUrlAnalytics(
    @Body() createUrlAnalyticsDto: CreateUrlAnalyticsDto
  ): Promise<void> {
    await this.analyticsService.createUrlAnalytics(createUrlAnalyticsDto);
  }
}

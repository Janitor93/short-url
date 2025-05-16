import { Controller, Post, Put, Body, UseFilters, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@app/common';

import { AnalyticsService } from './analytics.service';
import { CreateUrlAnalyticsDto } from './dto';
import { UrlAnalytics } from './interfaces';

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
    status: 201,
    description: 'Record was created successful'
  })
  async createUrlAnalytics(
    @Body() createUrlAnalyticsDto: CreateUrlAnalyticsDto
  ): Promise<UrlAnalytics> {
    return await this.analyticsService.createUrlAnalytics(createUrlAnalyticsDto);
  }

  @Put('/url/:id')
  @ApiOperation({
    summary: 'Update click statistic'
  })
  @ApiResponse({
    status: 201,
    description: 'Statistic was incremented successful'
  })
  async incrementClicks(@Param('id') id: string): Promise<void> {
    await this.analyticsService.incrementClicks(id);
  }
}

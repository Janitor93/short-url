import { Controller, Post, Put, Get, Body, UseFilters, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { HttpExceptionFilter, Pagination } from '@app/common';

import { AnalyticsService } from './analytics.service';
import { CreateUrlAnalyticsDto } from './dto';
import { UrlAnalytics } from './interfaces';
import { Analytics } from './analytics.entity';

@Controller('analytics')
@UseFilters(HttpExceptionFilter)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('/urls')
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

  @Put('/urls/:id')
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

  @Get('/urls')
  @ApiOperation({
    summary: 'Return user\'s analytics'
  })
  @ApiQuery({ name: 'page', required: false, default: 1, description: 'Page number', example: 1 })
  async getUserAnalytics(
    @Body('userId') userId: string,
    @Query('page') page: number,
  ): Promise<Pagination<Analytics>> {
    return await this.analyticsService.getUserAnalytics(userId, page);
  }
}

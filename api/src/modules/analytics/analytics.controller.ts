import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('metrics')
  getMetrics() {
    return this.analyticsService.getMetrics();
  }

  @Get('trends')
  getTrends(@Query('period') period: 'day' | 'week' | 'month') {
    return this.analyticsService.getTrends(period || 'day');
  }
}
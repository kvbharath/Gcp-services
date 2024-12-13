import { Controller, Post, Body } from '@nestjs/common';
import { TextAnalyticsService } from './text-analytics.service';

@Controller('text-analytics')
export class TextAnalyticsController {
  constructor(private readonly textAnalyticsService: TextAnalyticsService) {}

  @Post('analyze-sentiment')
  async analyzeSentiment(@Body('texts') texts: string[]) {
    const result = await this.textAnalyticsService.analyzeSentiment(texts);
    return { result };
  }
}

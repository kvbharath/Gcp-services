import { Controller, Post, Body } from '@nestjs/common';
import { TextAnalysisService } from './text-analysis.service';

@Controller('text-analysis')
export class TextAnalysisController {
  constructor(private readonly textAnalysisService: TextAnalysisService) {}

  // Sentiment analysis route
  @Post('sentiment')
  async analyzeSentiment(@Body() body: { text: string }) {
    const { text } = body;
    return this.textAnalysisService.analyzeSentiment(text);
  }

  // Entity analysis route
  @Post('entities')
  async analyzeEntities(@Body() body: { text: string }) {
    const { text } = body;
    return this.textAnalysisService.analyzeEntities(text);
  }
}

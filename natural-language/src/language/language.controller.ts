import { Controller, Post, Body } from '@nestjs/common';
import { LanguageService } from './language.service';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  // Endpoint to analyze sentiment
  @Post('analyze-sentiment')
  async analyzeSentiment(@Body('text') text: string) {
    if (!text) {
      throw new Error('Text is required');
    }

    const sentiment = await this.languageService.analyzeSentiment(text);
    return {
      sentimentScore: sentiment.score,
      sentimentMagnitude: sentiment.magnitude,
    };
  }
}

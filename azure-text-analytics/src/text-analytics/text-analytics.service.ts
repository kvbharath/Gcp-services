import { Injectable } from '@nestjs/common';
import {
  TextAnalyticsClient,
  AzureKeyCredential,
} from '@azure/ai-text-analytics';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TextAnalyticsService {
  private client: TextAnalyticsClient;

  constructor(private configService: ConfigService) {
    const endpoint = this.configService.get<string>(
      'AZURE_TEXT_ANALYTICS_ENDPOINT',
    );
    const key = this.configService.get<string>('AZURE_TEXT_ANALYTICS_KEY');

    this.client = new TextAnalyticsClient(
      endpoint,
      new AzureKeyCredential(key),
    );
  }

  async analyzeSentiment(texts: string[]): Promise<any> {
    try {
      const result = await this.client.analyzeSentiment(texts);
      return result;
    } catch (error) {
      console.error('Error analyzing sentiment:', error.message);
      throw error;
    }
  }
}

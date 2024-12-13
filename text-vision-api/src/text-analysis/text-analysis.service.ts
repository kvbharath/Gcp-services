import { Injectable } from '@nestjs/common';
import { LanguageServiceClient } from '@google-cloud/language';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

@Injectable()
export class TextAnalysisService {
  private client: LanguageServiceClient;

  constructor() {
    this.client = new LanguageServiceClient({
      credentials: {
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
    });
  }

  // Sentiment analysis
  async analyzeSentiment(text: string): Promise<any> {
    const document = {
      content: text,
      type: 'PLAIN_TEXT' as 'PLAIN_TEXT', // Explicitly set type as 'PLAIN_TEXT'
    };

    const [result] = await this.client.analyzeSentiment({ document });
    return result; // The response is automatically typed
  }

  // Entity analysis
  async analyzeEntities(text: string): Promise<any> {
    const document = {
      content: text,
      type: 'PLAIN_TEXT' as 'PLAIN_TEXT', // Explicitly set type as 'PLAIN_TEXT'
    };

    const [result] = await this.client.analyzeEntities({ document });
    return result; // The response is automatically typed
  }
}

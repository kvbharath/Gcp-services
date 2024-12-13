import { Injectable } from '@nestjs/common';
import { LanguageServiceClient } from '@google-cloud/language';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

@Injectable()
export class LanguageService {
  private languageClient: LanguageServiceClient;

  constructor() {
    // Initialize the Google Cloud Language client with environment variables
    this.languageClient = new LanguageServiceClient({
      credentials: {
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
    });
  }

  // Method to analyze sentiment of the text
  async analyzeSentiment(
    text: string,
  ): Promise<{ score: number; magnitude: number }> {
    if (!text || typeof text !== 'string') {
      throw new Error('Invalid text input');
    }

    const document = {
      content: text,
      type: 'PLAIN_TEXT' as 'PLAIN_TEXT',
    };

    try {
      // Call the sentiment analysis method
      const [result] = await this.languageClient.analyzeSentiment({ document });
      const sentiment = result.documentSentiment;

      return {
        score: sentiment.score,
        magnitude: sentiment.magnitude,
      };
    } catch (error) {
      throw new Error(`Error analyzing sentiment: ${error.message}`);
    }
  }

  // Additional methods like analyze entities, syntax, etc., can be added here
}

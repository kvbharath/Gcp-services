import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as fs from 'fs';

@Injectable()
export class SpeechService {
  private readonly apiKey: string;
  private readonly endpoint: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('AZURE_API_KEY');
    this.endpoint = this.configService.get<string>('AZURE_ENDPOINT');
  }

  async convertSpeechToText(audioFilePath: string) {
    const headers = {
      'Ocp-Apim-Subscription-Key': this.apiKey,
      'Content-Type': 'audio/wav',
    };

    const audioData = fs.readFileSync(audioFilePath);

    try {
      const response = await axios.post(this.endpoint, audioData, { headers });
      return response.data;
    } catch (error) {
      console.error(
        'Error converting speech to text:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}

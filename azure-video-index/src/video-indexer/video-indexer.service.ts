import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

@Injectable()
export class VideoIndexerService {
  private apiUrl = process.env.VIDEO_INDEXER_API_URL;
  private accountId = process.env.VIDEO_INDEXER_ACCOUNT_ID;
  private apiKey = process.env.VIDEO_INDEXER_API_KEY;

  async getAccessToken(): Promise<string> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/auth/v2/Accounts/${this.accountId}/AccessToken`,
        {},
        {
          headers: {
            'Ocp-Apim-Subscription-Key': this.apiKey,
          },
        },
      );
      return response.data.accessToken;
    } catch (error) {
      console.error('Error fetching access token:', error.message);
      throw new HttpException(
        'Failed to fetch access token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async uploadVideo(videoFileName: string): Promise<any> {
    try {
      // Validate and prepare file path
      const videoPath = path.join(__dirname, '../../videos', videoFileName);
      if (!fs.existsSync(videoPath)) {
        throw new HttpException(
          `File not found: ${videoPath}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      // Get access token
      const accessToken = await this.getAccessToken();

      // Prepare form-data for video upload
      const formData = new FormData();
      formData.append('file', fs.createReadStream(videoPath));

      const response = await axios.post(
        `${this.apiUrl}/videoindexer/v2/Accounts/${this.accountId}/Videos`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            ...formData.getHeaders(),
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(/er/, error);

      console.error('Error uploading video:', error.message);
      throw new HttpException('Failed to upload video', HttpStatus.BAD_REQUEST);
    }
  }

  async getVideoIndex(videoId: string): Promise<any> {
    try {
      // Get access token
      const accessToken = await this.getAccessToken();

      const response = await axios.get(
        `${this.apiUrl}/videoindexer/v2/Accounts/${this.accountId}/Videos/${videoId}/Index`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error retrieving video index:', error.message);
      throw new HttpException(
        'Failed to retrieve video index',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

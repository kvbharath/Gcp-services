import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { VideoIndexerService } from './video-indexer.service';

@Controller('video-indexer')
export class VideoIndexerController {
  constructor(private readonly videoIndexerService: VideoIndexerService) {}

  @Post('upload')
  async uploadVideo(@Body('fileName') fileName: string) {
    // Validate fileName before proceeding
    if (!fileName || typeof fileName !== 'string') {
      throw new HttpException(
        'Invalid or missing file name',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const result = await this.videoIndexerService.uploadVideo(fileName);
      return { message: 'Video uploaded successfully', data: result };
    } catch (error) {
      // Log the error for debugging
      console.error('Error in uploadVideo:', error.message);

      // Respond with a proper HTTP exception and status code
      throw new HttpException(
        error.message || 'An unexpected error occurred',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':videoId/index')
  async getVideoIndex(@Param('videoId') videoId: string) {
    try {
      const result = await this.videoIndexerService.getVideoIndex(videoId);
      return { message: 'Video index retrieved successfully', data: result };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}

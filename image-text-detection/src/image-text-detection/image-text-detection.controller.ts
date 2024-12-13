import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ImageTextDetectionService } from './image-text-detection.service';
import { IsBase64 } from 'class-validator';

class DetectTextDto {
  @IsBase64()
  base64Image: string;
}

@Controller('image-text-detection')
export class ImageTextDetectionController {
  constructor(
    private readonly imageTextDetectionService: ImageTextDetectionService,
  ) {}

  @Post('detect')
  async detectText(@Body() detectTextDto: DetectTextDto) {
    const { base64Image } = detectTextDto;

    if (!base64Image) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Base64 image is required',
      };
    }

    const result =
      await this.imageTextDetectionService.detectSafeSearch(base64Image);

    if (result.valid) {
      return {
        statusCode: HttpStatus.OK,
        message: result.message,
        text: result.text,
      };
    }

    return {
      statusCode: HttpStatus.FORBIDDEN,
      message: result.message,
    };
  }
}

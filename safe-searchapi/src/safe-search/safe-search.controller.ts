import { Controller, Post, Body } from '@nestjs/common';
import { ImageService } from './safe-search.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  // Endpoint to receive Base64 image and check for safe content
  @Post('upload')
  async uploadImage(@Body('image') base64Image: string): Promise<any> {
    const result = await this.imageService.detectSafeSearch(base64Image);
    return result;
  }
}

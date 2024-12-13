import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { VisionService } from './vision-api.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'multer/config';
import * as path from 'path';
@Controller('vision')
export class VisionController {
  constructor(private readonly visionService: VisionService) {}

  @Post('detect-text')
  @UseInterceptors(FileInterceptor('image', multerConfig)) // Use multerConfig
  async detectText(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string[]> {
    if (!file) {
      throw new Error('File is required');
    }

    const imagePath = file.path; // Path of the uploaded file
    return await this.visionService.detectText(imagePath);
  }

  @Post('detect-labels')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async detectLabels(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string[]> {
    if (!file) {
      throw new Error('File is required');
    }
    // Pass the file path to detectLabels
    return await this.visionService.detectLabels(file.path);
  }

  @Post('detect-objects')
  @UseInterceptors(FileInterceptor('image', multerConfig)) // File interceptor for image upload
  async detectObjects(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string[]> {
    if (!file) {
      throw new Error('File is required');
    }
    // Pass the uploaded file path to the service method
    return await this.visionService.detectObjects(file.path);
  }

  @Post('detect-image')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async checkImageForInvalidLabels(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ valid: boolean; message: string }> {
    const isValid = await this.visionService.checkImageForInvalidLabels(
      path.join(__dirname, '../../../' + file.path),
    );

    if (isValid) {
      return {
        valid: false,
        message: 'Invalid content detected in the image.',
      };
    }

    return {
      valid: true,
      message: 'No invalid content detected in the image.',
    };
  }
}

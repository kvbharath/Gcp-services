import { Module } from '@nestjs/common';
import { ImageTextDetectionService } from './image-text-detection.service';
import { ImageTextDetectionController } from './image-text-detection.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ImageTextDetectionController],
  providers: [ImageTextDetectionService],
})
export class ImageTextDetectionModule {}

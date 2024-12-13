import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageTextDetectionService } from './image-text-detection/image-text-detection.service';
import { ImageTextDetectionController } from './image-text-detection/image-text-detection.controller';
import { ImageTextDetectionModule } from './image-text-detection/image-text-detection.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ImageTextDetectionModule, HttpModule],
  controllers: [AppController, ImageTextDetectionController],
  providers: [AppService, ImageTextDetectionService],
})
export class AppModule {}

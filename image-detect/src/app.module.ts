import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageController } from './image-detect/image-detect.controller';
import { ImageService } from './image-detect/image-detect.service';
import { ImageDetectModule } from './image-detect/image-detect.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ImageDetectModule, HttpModule],
  controllers: [AppController, ImageController],
  providers: [AppService, ImageService],
})
export class AppModule {}

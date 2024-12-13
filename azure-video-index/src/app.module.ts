import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoIndexerController } from './video-indexer/video-indexer.controller';
import { VideoIndexerService } from './video-indexer/video-indexer.service';
import { VideoIndexerModule } from './video-indexer/video-indexer.module';

@Module({
  imports: [VideoIndexerModule],
  controllers: [AppController, VideoIndexerController],
  providers: [AppService, VideoIndexerService],
})
export class AppModule {}

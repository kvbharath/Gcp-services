import { Module } from '@nestjs/common';
import { VideoIndexerController } from './video-indexer.controller';
import { VideoIndexerService } from './video-indexer.service';

@Module({
  controllers: [VideoIndexerController],
  providers: [VideoIndexerService],
})
export class VideoIndexerModule {}

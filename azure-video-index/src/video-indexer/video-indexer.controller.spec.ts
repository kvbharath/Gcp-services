import { Test, TestingModule } from '@nestjs/testing';
import { VideoIndexerController } from './video-indexer.controller';

describe('VideoIndexerController', () => {
  let controller: VideoIndexerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoIndexerController],
    }).compile();

    controller = module.get<VideoIndexerController>(VideoIndexerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

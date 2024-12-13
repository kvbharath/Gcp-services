import { Test, TestingModule } from '@nestjs/testing';
import { VideoIndexerService } from './video-indexer.service';

describe('VideoIndexerService', () => {
  let service: VideoIndexerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoIndexerService],
    }).compile();

    service = module.get<VideoIndexerService>(VideoIndexerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

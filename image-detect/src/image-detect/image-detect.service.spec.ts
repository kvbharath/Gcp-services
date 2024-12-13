import { Test, TestingModule } from '@nestjs/testing';
import { ImageDetectService } from './image-detect.service';

describe('ImageDetectService', () => {
  let service: ImageDetectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageDetectService],
    }).compile();

    service = module.get<ImageDetectService>(ImageDetectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

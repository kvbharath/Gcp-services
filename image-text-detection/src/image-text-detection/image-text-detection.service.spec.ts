import { Test, TestingModule } from '@nestjs/testing';
import { ImageTextDetectionService } from './image-text-detection.service';

describe('ImageTextDetectionService', () => {
  let service: ImageTextDetectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageTextDetectionService],
    }).compile();

    service = module.get<ImageTextDetectionService>(ImageTextDetectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

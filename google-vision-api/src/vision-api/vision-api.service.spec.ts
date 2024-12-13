import { Test, TestingModule } from '@nestjs/testing';
import { VisionApiService } from './vision-api.service';

describe('VisionApiService', () => {
  let service: VisionApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisionApiService],
    }).compile();

    service = module.get<VisionApiService>(VisionApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

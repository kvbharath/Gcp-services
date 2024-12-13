import { Test, TestingModule } from '@nestjs/testing';
import { SafeSearchService } from './safe-search.service';

describe('SafeSearchService', () => {
  let service: SafeSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SafeSearchService],
    }).compile();

    service = module.get<SafeSearchService>(SafeSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

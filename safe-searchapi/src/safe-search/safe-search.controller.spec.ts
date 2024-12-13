import { Test, TestingModule } from '@nestjs/testing';
import { SafeSearchController } from './safe-search.controller';

describe('SafeSearchController', () => {
  let controller: SafeSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SafeSearchController],
    }).compile();

    controller = module.get<SafeSearchController>(SafeSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

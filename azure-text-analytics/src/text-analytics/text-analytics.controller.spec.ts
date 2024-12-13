import { Test, TestingModule } from '@nestjs/testing';
import { TextAnalyticsController } from './text-analytics.controller';

describe('TextAnalyticsController', () => {
  let controller: TextAnalyticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextAnalyticsController],
    }).compile();

    controller = module.get<TextAnalyticsController>(TextAnalyticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

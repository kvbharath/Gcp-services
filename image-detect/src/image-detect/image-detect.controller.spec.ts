import { Test, TestingModule } from '@nestjs/testing';
import { ImageDetectController } from './image-detect.controller';

describe('ImageDetectController', () => {
  let controller: ImageDetectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageDetectController],
    }).compile();

    controller = module.get<ImageDetectController>(ImageDetectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

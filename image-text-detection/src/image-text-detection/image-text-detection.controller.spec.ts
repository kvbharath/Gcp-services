import { Test, TestingModule } from '@nestjs/testing';
import { ImageTextDetectionController } from './image-text-detection.controller';

describe('ImageTextDetectionController', () => {
  let controller: ImageTextDetectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageTextDetectionController],
    }).compile();

    controller = module.get<ImageTextDetectionController>(ImageTextDetectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

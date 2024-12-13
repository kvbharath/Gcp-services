import { Module } from '@nestjs/common';
import { VisionService } from './vision-api.service';
import { VisionController } from './vision-api.controller';

@Module({
  providers: [VisionService],
  controllers: [VisionController],
})
export class VisionApiModule {}

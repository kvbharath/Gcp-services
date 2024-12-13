import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VisionApiModule } from './vision-api/vision-api.module';
import { VisionController } from './vision-api/vision-api.controller';
import { VisionService } from './vision-api/vision-api.service';

@Module({
  imports: [VisionApiModule],
  controllers: [AppController, VisionController],
  providers: [AppService, VisionService],
})
export class AppModule {}

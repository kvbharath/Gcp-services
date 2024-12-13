import { Module } from '@nestjs/common';
import { GoogleTranslateController } from './google-translate.controller';
import { GoogleTranslateService } from './google-translate.service';

@Module({
  controllers: [GoogleTranslateController],
  providers: [GoogleTranslateService]
})
export class GoogleTranslateModule {}

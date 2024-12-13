import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleTranslateModule } from './google-translate/google-translate.module';
import { GoogleTranslateService } from './google-translate/google-translate.service';

@Module({
  imports: [GoogleTranslateModule],
  controllers: [AppController],
  providers: [AppService, GoogleTranslateService],
})
export class AppModule {}

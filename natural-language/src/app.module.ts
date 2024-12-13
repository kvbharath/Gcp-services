import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LanguageService } from './language/language.service';
import { LanguageController } from './language/language.controller';
import { LanguageModule } from './language/language.module';

@Module({
  imports: [LanguageModule],
  controllers: [AppController, LanguageController],
  providers: [AppService, LanguageService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpeechModule } from './speech/speech.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SpeechModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

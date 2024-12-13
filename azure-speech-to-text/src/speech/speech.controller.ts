import { Controller, Post, Body } from '@nestjs/common';
import { SpeechService } from './speech.service';

@Controller('speech')
export class SpeechController {
  constructor(private readonly speechService: SpeechService) {}

  @Post('transcribe')
  async transcribe(@Body('audioFilePath') audioFilePath: string) {
    return this.speechService.convertSpeechToText(audioFilePath);
  }
}

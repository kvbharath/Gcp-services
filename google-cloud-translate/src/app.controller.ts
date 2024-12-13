import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('translate')
  async translateText(@Body() body: { text: string; language: string }) {
    return this.appService.translateText(body?.text, body.language);
  }
}

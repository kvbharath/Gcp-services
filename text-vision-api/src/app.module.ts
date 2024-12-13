import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextAnalysisModule } from './text-analysis/text-analysis.module';

@Module({
  imports: [TextAnalysisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

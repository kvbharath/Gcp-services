import { Module } from '@nestjs/common';
import { TextAnalysisService } from './text-analysis.service';
import { TextAnalysisController } from './text-analysis.controller';

@Module({
  providers: [TextAnalysisService],
  controllers: [TextAnalysisController]
})
export class TextAnalysisModule {}

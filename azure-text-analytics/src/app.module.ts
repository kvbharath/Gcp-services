import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextAnalyticsService } from './text-analytics/text-analytics.service';
import { TextAnalyticsController } from './text-analytics/text-analytics.controller';
import { ConfigModule } from '@nestjs/config';
import { TextAnalyticsModule } from './text-analytics/text-analytics.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TextAnalyticsModule,
  ],
  controllers: [AppController, TextAnalyticsController],
  providers: [AppService, TextAnalyticsService],
})
export class AppModule {}

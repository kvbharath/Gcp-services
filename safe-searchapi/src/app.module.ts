import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SafeSearchModule } from './safe-search/safe-search.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [SafeSearchModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

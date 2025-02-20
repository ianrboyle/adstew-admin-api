import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeaturedServiceController } from './featured-service/featured-service.controller';
import { FeaturedServiceService } from './featured-service/featured-service.service';

import { FeaturedServiceModule } from './featured-service/featured-service.module';

@Module({
  imports: [FeaturedServiceModule],
  controllers: [AppController, FeaturedServiceController],
  providers: [AppService, FeaturedServiceService],
})
export class AppModule {}

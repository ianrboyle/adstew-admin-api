import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { DatabaseModule } from '../database';

import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '../logger/logger.module';
import { FeaturedServiceController } from './featured-service.controller';
import { FeaturedServiceService } from './featured-service.service';

import { FeaturedServicePage } from './entities/featured-service-page.entity';
import { FeaturedServiceSectionListItem } from './entities/featured-service-section-list-item.entity';
import { FeaturedServiceSection } from './entities/featured-service-section.entity';
import { FeaturedServiceRepository } from './featured-service.repository';
@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      FeaturedServicePage,
      FeaturedServiceSection,
      FeaturedServiceSectionListItem,
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_PORT: Joi.number().required(),
      }),
    }),
    LoggerModule,
  ],
  controllers: [FeaturedServiceController],
  providers: [FeaturedServiceService, FeaturedServiceRepository],
  exports: [FeaturedServiceService, FeaturedServiceRepository],
})
export class FeaturedServiceModule {}

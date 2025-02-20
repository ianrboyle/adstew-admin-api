import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../database';

import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { FeaturedServicePage } from './entities/featured-service-page.entity';

@Injectable()
export class FeaturedServiceRepository extends AbstractRepository<FeaturedServicePage> {
  protected readonly logger = new Logger(FeaturedServiceRepository.name);

  constructor(
    @InjectRepository(FeaturedServicePage)
    featuredServicePageRepository: Repository<FeaturedServicePage>,
    entityManager: EntityManager,
  ) {
    super(featuredServicePageRepository, entityManager);
  }
}

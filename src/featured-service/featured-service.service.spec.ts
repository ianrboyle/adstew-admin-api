import { Test, TestingModule } from '@nestjs/testing';
import { FeaturedServiceService } from './featured-service.service';

describe('FeaturedServiceService', () => {
  let service: FeaturedServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeaturedServiceService],
    }).compile();

    service = module.get<FeaturedServiceService>(FeaturedServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

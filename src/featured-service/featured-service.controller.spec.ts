import { Test, TestingModule } from '@nestjs/testing';
import { FeaturedServiceController } from './featured-service.controller';

describe('FeaturedServiceController', () => {
  let controller: FeaturedServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeaturedServiceController],
    }).compile();

    controller = module.get<FeaturedServiceController>(FeaturedServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Injectable } from '@nestjs/common';
import { FeaturedServiceRepository } from './featured-service.repository';
import { CreateFeaturedServiceDto } from './dtos/featured-service-page.dto';
import { FeaturedServicePage } from './entities/featured-service-page.entity';
import { FeaturedServiceSection } from './entities/featured-service-section.entity';

@Injectable()
export class FeaturedServiceService {
  constructor(
    private readonly featuredServiceRepository: FeaturedServiceRepository,
  ) {}

  async createPage(createFeaturedServiceDto: CreateFeaturedServiceDto) {
    // Create the new FeaturedServicePage without sections
    const newFeaturedServicePage = new FeaturedServicePage({
      ...createFeaturedServiceDto,
      sections: [], // Empty sections array to be populated later
    });

    const page = await this.featuredServiceRepository.createWithoutSave(
      newFeaturedServicePage,
    );

    const pageSections = createFeaturedServiceDto.sections?.map(
      (section) =>
        new FeaturedServiceSection({
          title: section.title,
          body: section.body,
          isList: section.isList,
          subText: section.subText || null,
          listItems: section.listItems,
        }),
    );
    page.sections = pageSections;
    return await this.featuredServiceRepository.create(page);
  }

  async getPages() {
    const pages = await this.featuredServiceRepository.findAll();
    return pages;
  }
  async getPageById(id: number) {
    const pages = await this.featuredServiceRepository.findOne({ id }, [
      'sections',
    ]);
    return pages;
  }
}

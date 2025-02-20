import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FeaturedServiceService } from './featured-service.service';
import { CreateFeaturedServiceDto } from './dtos/featured-service-page.dto';

@Controller('featured-service')
export class FeaturedServiceController {
  constructor(
    private readonly featuredServiceService: FeaturedServiceService,
  ) {}

  @Get()
  async getAllPages() {
    return await this.featuredServiceService.getPages();
  }
  @Get(':id')
  async getPage(@Param('id') id: string) {
    return await this.featuredServiceService.getPageById(parseInt(id));
  }

  @Post()
  async createPage(@Body() createPageDto: CreateFeaturedServiceDto) {
    return await this.featuredServiceService.createPage(createPageDto);
  }
}

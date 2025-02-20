import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FeaturedServiceService } from './featured-service.service';
import { CreateFeaturedServiceDto } from './dtos/featured-service-page.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  async createPage(@Body() createPageDto: CreateFeaturedServiceDto) {
    return await this.featuredServiceService.createPage(createPageDto);
  }
}

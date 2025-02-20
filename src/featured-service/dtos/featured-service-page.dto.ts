import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { PageType } from '../../enums/page-type.enum';
import { Type } from 'class-transformer';
export class CreateSectionListItemDto {
  @IsString({ each: true })
  content: string[];

  @IsNumber()
  sectionId: number;
}

export class CreatePageSectionDto {
  @IsString()
  title: string;

  @IsString({ each: true }) // Validates each element as a string
  body: string[];

  @IsBoolean()
  isList: boolean;

  @IsOptional()
  @IsString()
  subText?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // Validates listItems as array of strings
  listItems?: string[];
}

export class CreateFeaturedServiceDto {
  @IsString()
  @Length(1, 255)
  initialDescriptionTitle: string;

  @IsString()
  initialDescription: string;

  @IsString()
  currentPage: PageType;

  @IsArray()
  @ValidateNested({ each: true }) // Validate each section individually
  @Type(() => CreatePageSectionDto) // Transform to the correct class
  sections: CreatePageSectionDto[];
}

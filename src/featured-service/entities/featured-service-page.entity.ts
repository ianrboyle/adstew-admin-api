import { Column, Entity, OneToMany } from 'typeorm';

import { FeaturedServiceSection } from './featured-service-section.entity';
import { AbstractEntity } from '../../database';
import { PageType } from '../../enums/page-type.enum';

@Entity()
export class FeaturedServicePage extends AbstractEntity<FeaturedServicePage> {
  @Column()
  initialDescriptionTitle: string;

  @Column({ type: 'text' })
  initialDescription: string;

  @Column()
  currentPage: PageType; // Can be an ENUM if needed

  @OneToMany(() => FeaturedServiceSection, (section) => section.page, {
    cascade: true,
  })
  sections: FeaturedServiceSection[];
}

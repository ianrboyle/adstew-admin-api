import { Column, Entity, ManyToOne } from 'typeorm';
import { FeaturedServiceSection } from './featured-service-section.entity';
import { AbstractEntity } from '../../database';

@Entity()
export class FeaturedServiceSectionListItem extends AbstractEntity<FeaturedServiceSectionListItem> {
  @ManyToOne(() => FeaturedServiceSection, (section) => section.listItems, {
    onDelete: 'CASCADE',
  })
  section: FeaturedServiceSection;

  @Column({ type: 'jsonb', default: [] }) // Use 'json' if on MySQL
  content: string[];
}

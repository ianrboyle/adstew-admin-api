import { Column, Entity, ManyToOne } from 'typeorm';

import { FeaturedServicePage } from './featured-service-page.entity';
import { AbstractEntity } from '../../database';

@Entity()
export class FeaturedServiceSection extends AbstractEntity<FeaturedServiceSection> {
  @ManyToOne(() => FeaturedServicePage, (page) => page.sections, {
    onDelete: 'CASCADE',
  })
  page: FeaturedServicePage;

  @Column()
  title: string;

  @Column({ type: 'jsonb', default: [] }) // Use 'json' if on MySQL
  body: string[];

  @Column()
  isList: boolean;

  @Column({ nullable: true })
  subText?: string;

  @Column('text', { array: true, nullable: true })
  listItems?: string[];
}

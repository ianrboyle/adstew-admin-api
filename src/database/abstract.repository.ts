import {
  EntityManager,
  EntityTarget,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Logger, NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected abstract readonly logger: Logger;
  constructor(
    private readonly entityRepository: Repository<T>,
    protected readonly entityManager: EntityManager,
  ) {}

  async create(entity: T): Promise<T> {
    return this.entityManager.save(entity);
  }

  async createWithoutSave(entity: T): Promise<T> {
    return this.entityManager.create(
      entity.constructor as EntityTarget<T>,
      entity,
    );
  }

  async createMultiple<T>(
    entityList: T[],
    entityClass: EntityTarget<T>,
  ): Promise<T[]> {
    // Convert plain objects to entity instances
    const entities = entityList.map((item) =>
      this.entityManager.create(entityClass, item),
    );
    return this.entityManager.save(entities);
  }

  // async findOne(where: FindOptionsWhere<T>): Promise<T> {
  //   const entity = await this.entityRepository.findOne({ where });
  //   if (!entity) {
  //     this.logger.warn('Entity not found with where: ', where);
  //     throw new NotFoundException(`Entity not found,`);
  //   }
  //   return entity;
  // }
  async findOne(where: FindOptionsWhere<T>, relations?: string[]): Promise<T> {
    const options: FindManyOptions<T> = { where };

    if (relations && relations.length > 0) {
      options.relations = relations;
    }

    const entity = await this.entityRepository.findOne(options);

    if (!entity) {
      this.logger.warn('Entity not found with where:', where);
      throw new NotFoundException('Entity not found');
    }

    return entity;
  }
  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ) {
    const updateResult = await this.entityRepository.update(
      where,
      partialEntity,
    );

    if (!updateResult) {
      this.logger.warn('Entity not found with where: ', where);
      throw new NotFoundException(`Entity not found`);
    }

    return this.findOne(where);
  }

  async find(where: FindOptionsWhere<T>) {
    return this.entityRepository.findBy(where);
  }

  async findOneAndDelete(where: FindOptionsWhere<T>) {
    await this.entityRepository.delete(where);
  }

  async findAll(): Promise<T[]> {
    return this.entityRepository.find({});
  }
}

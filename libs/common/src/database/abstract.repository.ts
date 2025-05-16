import {
  DeepPartial,
  Repository,
  FindOptionsWhere,
  FindManyOptions,
  FindOneOptions,
  DeleteResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { BaseEntity } from './base.entity';
import { Pagination } from '../interfaces';

export abstract class AbstractRepository<T extends BaseEntity> {
  constructor(private readonly entity: Repository<T>) {}

  public async save(data: DeepPartial<T>): Promise<T> {
    const entity = this.entity.create(data);
    return await this.entity.save(entity);
  }

  public async findById(id: string): Promise<T> {
    const options = { id } as FindOptionsWhere<T>;
    return await this.entity.findOneBy(options);
  }

  public async findAll(
    filters?: FindOptionsWhere<T>,
    page?: number,
    limit?: number,
  ): Promise<Pagination<T>> {
    const skip = (page - 1) * limit;
    const [data, total] = await this.entity.findAndCount({
      where: filters,
      skip,
      take: limit,
    });

    return {
      data,
      pagination: {
        itemsPerPage: limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        page,
      },
    };
  }

  public async findOne(options: FindOneOptions<T>): Promise<T> {
    return await this.entity.findOne(options);
  }

  public async delete(id: string): Promise<DeleteResult> {
    return await this.entity.delete(id);
  }

  public async update(id: string, data: QueryDeepPartialEntity<T>): Promise<T> {
    await this.entity.update(id, data);
    return await this.findById(id);
  }
}

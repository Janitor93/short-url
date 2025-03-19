import {
  DeepPartial,
  Repository,
  FindOptionsWhere,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';
import { BaseEntity } from './base.entity';

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

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(options);
  }

  public async findOne(options: FindOneOptions<T>): Promise<T> {
    return await this.entity.findOne(options);
  }

  public async remove(data: T): Promise<T> {
    return this.entity.remove(data);
  }
}

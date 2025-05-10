import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseConfig from '../config/database.config';
import { DatabaseOptions } from './database-options.interface';

@Module({})
export class DatabaseModule {
  static forRoot(options: DatabaseOptions): DynamicModule {
    const { type, entities } = options;
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forFeature(entities),
        TypeOrmModule.forRoot({
          ...databaseConfig(type),
          entities,
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}

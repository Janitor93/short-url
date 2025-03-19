import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseConfig from '../config/database.config';

@Module({})
export class DatabaseModule {
  static forRoot(entities = []): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forFeature(entities),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule, TypeOrmModule.forRoot(databaseConfig())],
          inject: [ConfigService],
          useFactory: async () => {
            return {
              ...databaseConfig(),
              entities,
            };
          },
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}

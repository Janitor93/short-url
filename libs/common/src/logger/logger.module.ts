import { Module, DynamicModule } from '@nestjs/common';

import { LoggerService } from './logger.service';

@Module({})
export class LoggerModule {
  static registry(serviceName: string): DynamicModule {
    return {
      module: LoggerModule,
      providers: [{
        provide: LoggerService,
        useValue: new LoggerService(serviceName),
      }],
      exports: [LoggerService],
    };
  }
}

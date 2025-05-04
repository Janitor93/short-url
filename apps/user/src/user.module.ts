import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import {
  DatabaseModule,
  LoggerModule,
  PasswordModule,
  LoggingInterceptor,
} from '@app/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { appConfig } from './config';

@Module({
  imports: [
    DatabaseModule.forRoot([User]),
    LoggerModule.registry(appConfig.logger.namespace),
    PasswordModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class UserModule {}

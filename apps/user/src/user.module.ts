import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
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

@Module({
  imports: [DatabaseModule.forRoot([User]), LoggerModule.registry('user'), PasswordModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class UserModule {}

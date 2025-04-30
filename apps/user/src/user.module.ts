import { join } from 'path';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import {
  DatabaseModule,
  LoggerModule,
  PasswordModule,
  LoggingInterceptor,
} from '@app/common';
import { GrpcService, RPC_AUTH_SERVICE_NAME, AUTH_PACKAGE_NAME } from '@app/grpc';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    DatabaseModule.forRoot([User]),
    LoggerModule.registry('user'),
    PasswordModule,
    ClientsModule.register([{
      name: RPC_AUTH_SERVICE_NAME,
      transport: Transport.GRPC,
      options: {
        package: AUTH_PACKAGE_NAME,
        protoPath: join(__dirname, `../../../libs/grpc/${GrpcService.getAuthProtoPath()}`),
        url: `${process.env.AUTH_API}:${process.env.AUTH_PORT}`,
      },
    }]),
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

import { join } from 'path';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule, LoggerModule, LoggingInterceptor } from '@app/common';
import { RPC_USER_SERVICE_NAME, USER_PACKAGE_NAME, GrpcService } from '@app/grpc';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { appConfig } from './config';

@Module({
  imports: [
    LoggerModule.registry(appConfig.logger.namespace),
    RedisModule.register(appConfig.cache.namespace),
    ClientsModule.register([{
      name: RPC_USER_SERVICE_NAME,
      transport: Transport.GRPC,
      options: {
        package: USER_PACKAGE_NAME,
        protoPath: join(__dirname, `../../../libs/grpc/${GrpcService.getUserProtoPath()}`),
        url: `${appConfig.userApp.url}:${appConfig.userApp.port}`,
      },
    }]),
    JwtModule.register({
      secret: appConfig.jwt.secretKey,
      signOptions: { expiresIn: appConfig.jwt.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ],
})
export class AuthModule {}

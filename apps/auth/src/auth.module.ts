import { join } from 'path';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '@app/common';
import { RPC_USER_SERVICE_NAME, USER_PACKAGE_NAME, GrpcService } from '@app/grpc';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    RedisModule.register('refresh'),
    ClientsModule.register([{
      name: RPC_USER_SERVICE_NAME,
      transport: Transport.GRPC,
      options: {
        package: USER_PACKAGE_NAME,
        protoPath: join(__dirname, `../../../libs/grpc/${GrpcService.getUserProtoPath()}`),
        url: `${process.env.USER_URL}:${process.env.USER_PORT}`,
      },
    }]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

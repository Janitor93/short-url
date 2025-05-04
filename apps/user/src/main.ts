import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GrpcService, USER_PACKAGE_NAME } from '@app/grpc';

import { UserModule } from './user.module';
import { appConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: USER_PACKAGE_NAME,
      protoPath: join(__dirname, `../../../libs/grpc/${GrpcService.getUserProtoPath()}`),
      url: `${appConfig.app.url}:${appConfig.app.externalPort}`,
    },
  });
  app.enableCors();
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: ['1'] });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.startAllMicroservices();
  await app.listen(appConfig.app.internalPort);
}
bootstrap();

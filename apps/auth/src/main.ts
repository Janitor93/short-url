import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME, GrpcService } from '@app/grpc';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AuthModule } from './auth.module';
import { appConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  /**
   * App configs
   */
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, `../../../libs/grpc/${GrpcService.getAuthProtoPath()}`),
      url: `${appConfig.app.url}:${appConfig.app.externalPort}`,
    },
  });
  app.enableCors();
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: ['1'] });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  /**
   * Swagger config
   */
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Authorization Service')
    .setVersion('1')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.startAllMicroservices();
  await app.listen(appConfig.app.internalPort);
}
bootstrap();

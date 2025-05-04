import { NestFactory } from '@nestjs/core';
import { VersioningType, RequestMethod } from '@nestjs/common';

import { AppModule } from './app.module';
import { appConfig, createDb } from './config';

async function bootstrap() {
  await createDb();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/:code', method: RequestMethod.GET }],
  });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: ['1'] });
  await app.listen(appConfig.app.internalPort);
}
bootstrap();

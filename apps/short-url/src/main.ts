import { NestFactory } from '@nestjs/core';
import { VersioningType, RequestMethod } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { appConfig, createDb } from './config';

async function bootstrap() {
  await createDb();
  const app = await NestFactory.create(AppModule);

  /**
   * App configs
   */
  app.enableCors();
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/:code', method: RequestMethod.GET }],
  });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: ['1'] });

  /**
   * Swagger config
   */
  const config = new DocumentBuilder()
    .setTitle('URL API')
    .setDescription('URL Service')
    .setVersion('1')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(appConfig.app.internalPort);
}
bootstrap();

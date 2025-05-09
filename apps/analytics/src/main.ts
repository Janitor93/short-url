import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AnalyticsModule } from './analytics.module';
import { appConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AnalyticsModule);

  /**
   * App configs
   */
  app.enableCors();
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: ['1'] });

  /**
   * Swagger config
   */
  const config = new DocumentBuilder()
    .setTitle('Analytics API')
    .setDescription('Analytics Service')
    .setVersion('1')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(appConfig.app.internalPort);
}
bootstrap();

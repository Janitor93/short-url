import { NestFactory } from '@nestjs/core';
import { VersioningType, ValidationPipe } from '@nestjs/common';

import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: ['1'] });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(parseInt(process.env.PORT));
}
bootstrap();

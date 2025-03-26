import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: ['1'] });
  await app.listen(parseInt(process.env.PORT));
}
bootstrap();

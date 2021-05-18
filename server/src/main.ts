import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {Logger} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Server started on http://localhost:${port}/graphql`, 'Server');
}
bootstrap();

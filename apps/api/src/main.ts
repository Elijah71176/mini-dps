import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
// Enable CORS for the specified origins
/*
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://mini-dps.vercel.app',
      /\.vercel\.app$/,

      */

      app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://mini-dps.vercel.app',
    /\.vercel\.app$/,
    'http://mini-dps-frontend-elijah.s3-website.eu-north-1.amazonaws.com',
    ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT ?? 3001;
  await app.listen(port, '0.0.0.0');

  console.log(`Application is running on: http://localhost:${port}`);
  console.log('DATABASE_URL loaded:', process.env.DATABASE_URL);
}

bootstrap();
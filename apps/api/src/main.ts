import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Updated CORS to allow both Local and Vercel
  app.enableCors({ 
    origin: [
      'http://localhost:3000', 
      'https://mini-dps.vercel.app', // Add your actual production link here
      /\.vercel\.app$/ 
    ],
    credentials: true 
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Use 0.0.0.0 for Docker and Cloud compatibility
  const port = process.env.PORT ?? 3001;
  await app.listen(port, '0.0.0.0');
  
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
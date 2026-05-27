import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
   * CORS
   * 프론트(localhost:3000 등)에서
   * 백엔드 API 접근 가능하게 설정
   */
  app.enableCors({
    origin: true,

    credentials: true,

    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],

    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  /*
   * Global Validation
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

      /*
       * DTO에 없는 값 들어오면 제거
       */
      forbidNonWhitelisted: true,

      /*
       * string -> number 자동 변환
       */
      transform: true,
    }),
  );

  /*
   * API Versioning
   *
   * ex)
   * /v1/users
   */
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  /*
   * Swagger Config
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('GKnow API')
    .setDescription('GKnow Backend API Documentation')
    .setVersion('1.0')

    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  /*
   * Swagger URL
   *
   * http://localhost:3000/docs
   */
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3000);

  console.log(`🚀 Server running on http://localhost:3000`);

  console.log(`📄 Swagger Docs: http://localhost:3000/docs`);
}
void bootstrap();

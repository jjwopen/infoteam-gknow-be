import { NestFactory } from '@nestjs/core';

import { ValidationPipe, VersioningType } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
   * CORS
   */
  app.enableCors({
    origin: true,

    credentials: true,

    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  /*
   * Global Validation
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

      /*
       * DTO에 없는 값 차단
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
   * Swagger
   */
  const config = new DocumentBuilder()
    .setTitle('GKnow API')
    .setDescription('GKnow Backend API Documentation')
    .setVersion('1.0')

    /*
     * JWT 붙일 때 사용
     */
    // .addBearerAuth()

    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  /*
   * Server Start
   */
  await app.listen(3000);

  console.log(`🚀 Server running on http://localhost:3000`);

  console.log(`📄 Swagger Docs: http://localhost:3000/docs`);
}

void bootstrap();

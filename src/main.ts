import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.enableCors({
  origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Outlook Mail Backend API')
    .setDescription('Outlook 메일 수집, 알림, 첨부파일 다운로드 API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);

}

bootstrap();
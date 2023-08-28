import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { config } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  // Swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('NestJS project')
    .setDescription('NestJS project API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      // 새로고침해도 BearerToken 값이 유지되도록
      persistAuthorization: true,
    },
  };
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document, customOptions);

  // ValidationPipe 전역 적용
  app.useGlobalPipes(
    new ValidationPipe({
      // class-transformer 적용
      transform: true,
    }),
  );

  await app.listen(config.PORT);

  console.info(`NODE_ENV: ${config.NODE_ENV}`);
  console.info(`listening on port ${config.PORT}`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { Logger as logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Riwi Coworking API')
    .setDescription(`System for Riwi's coworking reservations`)
    .setVersion('1.0')
    .addTag('Users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT, '0.0.0.0', () => {
    logger.log(`App running on port ${process.env.PORT}`);
  });
  logger.log(`App running on port ${process.env.PORT}`);
}
bootstrap();

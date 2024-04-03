import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'templates'));
  app.setViewEngine('hbs');
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Reservation example')
    .setDescription('The reservation API description')
    .setVersion('1.0')
    .addTag('reservation')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);
  const PORT = process.env.PORT || 3000
  await app.listen(PORT);
}
bootstrap();

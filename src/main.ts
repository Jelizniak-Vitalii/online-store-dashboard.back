import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from './shared/pipes/validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 6000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Online store dashboard')
    .setDescription('REST API documentation')
    .setVersion('1.0.0')
    .addTag('NestJS')
    .build();

  app.enableCors();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

bootstrap();

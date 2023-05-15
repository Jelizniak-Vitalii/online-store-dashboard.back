import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 6000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Online store dashboard')
    .setDescription('REST API documentation')
    .setVersion('1.0.0')
    .addTag('NestJS')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/', app, document);

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

bootstrap();

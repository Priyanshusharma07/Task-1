import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  
  const config = new DocumentBuilder()
    .setTitle('The Software Machine- Task')
    .setDescription('API documentation for my NestJS app')
    .setVersion('1.0')
    .addTag('users') 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);


  await app.listen( 3000);
}
bootstrap();

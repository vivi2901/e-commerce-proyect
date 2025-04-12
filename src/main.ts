import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, 
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('E-commerce')
    .setDescription('Api e-commerce')
    .setVersion('1.0')
    .addTag('e-commerce')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
      description: 'Enter your Bearer token',
    })
    .addSecurityRequirements('bearer')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const jwtAuthGuard = app.get(JwtAuthGuard);

  app.useGlobalGuards(jwtAuthGuard);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

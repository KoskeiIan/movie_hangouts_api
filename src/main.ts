import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaService } from './prisma.service';

// API Entrypoint
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Movie Hangouts')
    .setDescription('This is the official backend API for movie hangouts')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutDownHooks(app);

  app.setGlobalPrefix('api/v1')
  app.enableCors({
    origin: ['http://localhost:3000', 'exp://'],
  })
  await app.listen(parseInt(process.env.PORT!) || 3000);
}
bootstrap();

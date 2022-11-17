import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
    });

    // Para conseguir pegar o protocolo https
    app.set('trust proxy', 1);

    // Validation
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    // Swagger
    const config = new DocumentBuilder()
        .setTitle('Virtumed')
        .setDescription('An api for video calling doctors and patients')
        .setVersion('1.0.0')
        .addTag('status')
        .addTag('access')
        .addTag('cadastrar')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(3333);

    const baseUrl = 'http://localhost:3333';
    console.log(`🚀 Server is running on!  ${baseUrl}/docs`);
}
bootstrap();

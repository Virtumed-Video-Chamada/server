import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as admin from 'firebase-admin';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const NEST_LOGGING = false;
    const opts: NestApplicationOptions = {};
    if (!NEST_LOGGING) {
        opts.logger = false;
    }
    admin.initializeApp({
        credential: admin.credential.cert({
            apiKey: process.env.apiKey,
            appId: process.env.appId,
            authDomain: process.env.authDomain,
            measurementId: process.env.measurementId,
            messagingSenderId: process.env.messagingSenderId,
            projectId: process.env.projectId,
            storageBucket: process.env.storageBucket,
        } as Partial<admin.ServiceAccount>),
        //databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
    app.enableCors({
        credentials: true,
        allowedHeaders: '*',
        origin: '*',
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
        .setTitle('aTip')
        .setDescription(
            'Aplicação para gestionar o cadastro de novas companias parceiras',
        )
        .setVersion('1.0.0')
        .addTag('status')
        .addTag('auth')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(3333);

    const baseUrl = 'http://localhost:3333';
    console.log(`🚀 Server is running on!  ${baseUrl}/docs`);
}
bootstrap();

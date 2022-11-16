import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/auth/auth.module';
import { FirebaseService } from './app/firebase/firebase.service';

@Module({
    controllers: [AppController],
    imports: [AuthModule, ConfigModule.forRoot()],
    providers: [FirebaseService, AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { SchedulingService as SchedulingService } from './scheduling.service';
import { SchedulingController as SchedulingController } from './scheduling.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [PrismaModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '24h' },
        }),],
    controllers: [SchedulingController],
    providers: [SchedulingService]
})
export class SchidulingModule { }

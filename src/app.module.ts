import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClinicModule } from './clinic/clinic.module';
import { DoctorModule } from './doctor/doctor.module';
import { PacientModule } from './pacient/pacient.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './email/mail.module';
import { SchidulingModule } from './scheduling/scheduling.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminModule } from './admin/admin.module';

@Module({
    imports: [
        AdminModule,
        MailModule,
        PrismaModule,
        AuthModule,
        DoctorModule,
        ClinicModule,
        PacientModule,
        UserModule,
        SchidulingModule,
        ScheduleModule.forRoot(),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

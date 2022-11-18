import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClinicModule } from './clinic/clinic.module';
import { DoctorModule } from './doctor/doctor.module';
import { PacientModule } from './pacient/pacient.module';

@Module({
    controllers: [AppController],
    imports: [
        AuthModule,
        DoctorModule,
        ClinicModule,
        PacientModule,
        UserModule,
    ],
    providers: [AppService],
})
export class AppModule {}

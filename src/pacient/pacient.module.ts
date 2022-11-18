import { Module } from '@nestjs/common';
import { PacientService } from './pacient.service';
import { PacientController } from './pacient.controller';

@Module({
    controllers: [PacientController],
    providers: [PacientService],
})
export class PacientModule {}

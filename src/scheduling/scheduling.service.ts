import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { prisma } from '@prisma/client';
import { CronJob } from 'cron';
import { PrismaService } from 'src/prisma/prisma.service';
import { SchedulingDto } from './dto/create-scheduling.dto';

@Injectable()
export class SchedulingService {

    private readonly logger = new Logger(SchedulingService.name);

    constructor(private schedulerRegistry: SchedulerRegistry) { }

    AddAgendMedic(dto: SchedulingDto) {
        const data: Partial<SchedulingDto> = { ...dto }

        const job = new CronJob(`${data.day}* * * * * *`, () => {
            this.logger.warn(`Faltam ${data.day} para sua consulta com o médico ${data.name}.`)
        })

        this.schedulerRegistry.addCronJob(data.name, job)
        this.logger.warn(
            `Consulta com o médico ${data.name} daqui a  ${data.day} dias!`,
        );
    }

}
         
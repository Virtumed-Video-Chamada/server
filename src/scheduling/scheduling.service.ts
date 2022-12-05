import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { SchedulingDto } from './dto/create-scheduling.dto';

@Injectable()
export class SchedulingService {

    private readonly logger = new Logger(SchedulingService.name);

    constructor(private schedulerRegistry: SchedulerRegistry) { }

    AddMedicine(dto: SchedulingDto) {
        // adicionar um remédio
        const query = new CronJob(` *
        ${dto.minute} 
        ${dto.hour}
        ${dto.day} 
        ${dto.mounth}
        ${dto.dayOfWeek} '`, () => {
            this.logger.warn
        });

        this.schedulerRegistry.addCronJob(dto.name, query);
        query.start();

        this.logger.warn(
            `Consulta com o médico ${dto.name} para o dia  ${dto.day} dias!`,
        );
    }


    CancelMedicine(name: string) {
        // cancelar um remédio para tomar
        this.schedulerRegistry.deleteCronJob(name);
        this.logger.warn(`Consulta com médico ${name} foi cancelada`);
    }

    getMedicine() {
        //ver os remédios
        const querys = this.schedulerRegistry.getCronJobs();
        querys.forEach((value, key, map) => {
            let next;
            try {
                next = value.nextDates().toJSDate();
            } catch (e) {
                next = 'error: next fire date is in the past!';
            }
            this.logger.log(`query: ${key} -> next: ${next}`);
        });
    }
}


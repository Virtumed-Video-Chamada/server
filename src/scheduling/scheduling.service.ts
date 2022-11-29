import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { SchedulingDto } from './dto/create-scheduling.dto';

@Injectable()
export class SchedulingService {

    private readonly logger = new Logger(SchedulingService.name);

    constructor(private schedulerRegistry: SchedulerRegistry) { }

    AddAgendMedic(dto: SchedulingDto) {
        //quantos dias faltma para sua consulta
        const data: Partial<SchedulingDto> = { ...dto }

        const query = new CronJob(`${data.day}* * * * * *`, () => {
            this.logger.warn(`Faltam ${data.day} para sua consulta com o médico ${data.name}.`)
        });

        this.schedulerRegistry.addCronJob(data.name, query);
        query.start();

        this.logger.warn(
            `Consulta com o médico ${data.name} daqui a  ${data.day} dias!`,
        );
    }


    CancelQuery(name: string) {
        // cancelar sua uma consulta passando o nome do médico
        this.schedulerRegistry.deleteCronJob(name);
        this.logger.warn(`Consulta com médico ${name} foi cancelada`);

    }

    getQuery() {
        // ver as consultas 
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

 
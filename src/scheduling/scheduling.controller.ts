import {
    Body, Controller, Delete, Patch, Post,
    Param,
    Get,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SchedulingDto } from './dto/create-scheduling.dto';
import { SchedulingService } from './scheduling.service';

@ApiTags('scheduling')
@Controller('scheduling')
export class SchedulingController {
    constructor(private readonly schedulngService: SchedulingService) { }

    @Post()
    @ApiOperation({
        summary: 'Agendar uma consulta.',
    })
    async addScheduling(@Body() createScheduling: SchedulingDto) {
        return this.schedulngService.AddMedicine(createScheduling);
    }

    @Delete(':name')
    @ApiOperation({
        summary: 'Cancelar uma consulta.'
    })
    async cancelQuery(@Param('name') name: string) {
        return this.schedulngService.CancelMedicine(name)
    }

    @Get()
    @ApiOperation({
        summary:'Pegar todos os agendamentos pelo nome.'
    })
    async getQuery(){
        return this.schedulngService.getMedicine()
    }

}
 
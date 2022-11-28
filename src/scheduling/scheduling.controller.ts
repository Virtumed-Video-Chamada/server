import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SchedulingDto } from './dto/create-scheduling.dto';
import { SchedulingService } from './scheduling.service';

@Controller('agenda')
export class SchedulingController {
  constructor(private readonly schedulngService: SchedulingService) {}

  @Post()
    @ApiOperation({
        summary: 'Cadastrar uma Clínica',
    })
    async createClinic(@Body() createScheduling: SchedulingDto) {
        return this.schedulngService.AddAgendMedic(createScheduling);
    }
}

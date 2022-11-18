import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedClinic } from 'src/auth/decorators/logged-clinic.decorator';
import { User } from 'src/models/user.model';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dto/create-clinic.dto';

@ApiTags('clinic')
@Controller('clinic')
export class ClinicController {
    constructor(private readonly clinicService: ClinicService) {}

    @Get('all')
    @ApiOperation({
        summary: 'Retorna todas as clínicas',
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findAll() {
        return this.clinicService.findAll();
    }

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Get(':id')
    @ApiOperation({
        summary: 'Visualizar uma clínica pelo ID',
    })
    findOne(@LoggedClinic() user: User) {
        return this.clinicService.findById(user.id);
    }

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Patch(':id')
    @ApiOperation({
        summary: 'Editar uma clínica pelo ID',
    })
    updateUser(
        @LoggedClinic() user: User,
        @Body() udateClinicDto: CreateClinicDto,
    ) {
        return this.clinicService.updateClinic(user.id, udateClinicDto);
    }
}

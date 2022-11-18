import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedClinic } from 'src/auth/decorators/logged-clinic.decorator';
import { User } from 'src/models/user.model';
import { CreatePacientDto } from './dto/create-pacient.dto';
import { PacientService } from './pacient.service';

@ApiTags('clinic')
@Controller('clinic')
export class PacientController {
    constructor(private readonly pacientService: PacientService) {}

    @Get('all')
    @ApiOperation({
        summary: 'Retorna todas as clínicas',
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findAll() {
        return this.pacientService.findAll();
    }

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Get(':id')
    @ApiOperation({
        summary: 'Visualizar uma pacient pelo ID',
    })
    findOne(@LoggedClinic() user: User) {
        return this.pacientService.findById(user.id);
    }

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Patch(':id')
    @ApiOperation({
        summary: 'Editar uma clínica pelo ID',
    })
    updateUser(
        @LoggedClinic() user: User,
        @Body() updatePacientDto: CreatePacientDto,
    ) {
        return this.pacientService.updatePacient(user.id, updatePacientDto);
    }
}

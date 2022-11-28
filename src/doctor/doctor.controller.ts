import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedClinic } from 'src/auth/decorators/logged-clinic.decorator';
import { LoggedDoctor } from 'src/auth/decorators/logged-doctor.decorator';
import { User } from 'src/models/user.model';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@ApiTags('doctor')
@Controller('doctor')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) {}

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Get('all')
    @ApiOperation({
        summary: 'Retorna todos os doutores dessa clínica',
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findAll(@LoggedClinic() user: User) {
        return this.doctorService.findAll();
    }

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Get(':id')
    @ApiOperation({
        summary: 'Visualizar um doutor pelo ID',
    })
    findOne(@LoggedDoctor() user: User) {
        return this.doctorService.findById(user.id);
    }

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Patch(':id')
    @ApiOperation({
        summary: 'Editar um doutor pelo ID',
    })
    updateUser(
        @LoggedDoctor() user: User,
        @Body() udateUserDto: CreateDoctorDto,
    ) {
        return this.doctorService.updateDoctor(user.id, udateUserDto);
    }
}
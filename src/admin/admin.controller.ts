import {
    Controller,
    Post,
    Body,
    UseGuards,
    Delete,
    Param,
    HttpCode,
    HttpStatus,
    Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createUserDto } from './dto/createUser.dto';
import { User } from 'src/models/user.model';
import { AuthGuard } from '@nestjs/passport';
import { LoggedAdmin } from 'src/auth/decorators/logged-admin.decorator';
import { AdminService } from './admin.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly userService: AdminService) {}

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Get('admin/get-doctors')
    @ApiOperation({
        summary:
            'Retorna todos os Médicos através da pesquisa feita por um Administrador',
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findAllDoctors(@LoggedAdmin() user: User) {
        return this.userService.findAllDoctors();
    }

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Post('admin')
    @ApiOperation({
        summary: 'Cadastrar um Admin',
    })
    async createAdmin(
        @LoggedAdmin() user: User,
        @Body() createAdmin: createUserDto,
    ) {
        return this.userService.createDoctor(createAdmin);
    }

    @Post('doctor')
    @ApiOperation({
        summary: 'Cadastrar um Doutor',
    })
    async createDoctor(
        @LoggedAdmin() user: User,
        @Body() createDoctor: createUserDto,
    ) {
        return this.userService.createDoctor(createDoctor);
    }

    @Post('pacient')
    @ApiOperation({
        summary: 'Cadastrar um Paciente',
    })
    async createPacient(
        @LoggedAdmin() user: User,
        @Body() createPacient: createUserDto,
    ) {
        return this.userService.createDoctor(createPacient);
    }

    @Post('clinic')
    @ApiOperation({
        summary: 'Cadastrar uma Clínica',
    })
    async createClinic(
        @LoggedAdmin() user: User,
        @Body() createClinic: createUserDto,
    ) {
        return this.userService.createDoctor(createClinic);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Remover um doutor pelo ID',
    })
    delete(@LoggedAdmin() user: User, @Param('id') id: string) {
        this.userService.delete(id);
    }
}

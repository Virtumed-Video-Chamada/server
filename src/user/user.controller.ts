import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createUserDto } from './dto/createUser.dto';
import { LoggedUser } from 'src/auth/decorators/logged-user.decorator';
import { User } from 'src/models/user.model';
import { AuthGuard } from '@nestjs/passport';
import { LoggedAdmin } from 'src/auth/decorators/logged-admin.decorator';

@ApiTags('register')
@Controller('register')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Post('admin')
    @ApiOperation({
        summary: 'Cadastrar um Admin',
    })
    async createAdmin(
        @LoggedAdmin() user: User,
        @Body() createDocotor: createUserDto,
    ) {
        return this.userService.createDoctor(createDocotor);
    }

    @Post('doctor')
    @ApiOperation({
        summary: 'Cadastrar um Doutor',
    })
    async createDoctor(
        @LoggedUser() user: User,
        @Body() createDocotor: createUserDto,
    ) {
        return this.userService.createDoctor(createDocotor);
    }

    @Post('pacient')
    @ApiOperation({
        summary: 'Cadastrar um Paciente',
    })
    async createPacient(
        @LoggedUser() user: User,
        @Body() createDocotor: createUserDto,
    ) {
        return this.userService.createDoctor(createDocotor);
    }

    @Post('clinic')
    @ApiOperation({
        summary: 'Cadastrar uma Clínica',
    })
    async createClinic(
        @LoggedUser() user: User,
        @Body() createDocotor: createUserDto,
    ) {
        return this.userService.createDoctor(createDocotor);
    }
}

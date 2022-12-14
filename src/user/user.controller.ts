import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createUserDto } from './dto/createUser.dto';
import { User } from 'src/models/user.model';
import { AuthGuard } from '@nestjs/passport';
import { LoggedAdmin } from 'src/auth/decorators/logged-admin.decorator';
import { LoggedClinic } from 'src/auth/decorators/logged-clinic.decorator';

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
        @Body() createAdmin: createUserDto,
    ) {
        return this.userService.createDoctor(createAdmin);
    }

    @Post('doctor')
    @ApiOperation({
        summary: 'Cadastrar um Doutor',
    })
    async createDoctor(
        @LoggedClinic() user: User,
        @Body() createDoctor: createUserDto,
    ) {
        return this.userService.createDoctor(createDoctor);
    }

    @Post('pacient')
    @ApiOperation({
        summary: 'Cadastrar um Paciente',
    })
    async createPacient(
        @LoggedClinic() user: User,
        @Body() createPacient: createUserDto,
    ) {
        return this.userService.createDoctor(createPacient);
    }

    @Post('clinic')
    @ApiOperation({
        summary: 'Cadastrar uma Clínica',
    })
    async createClinic(@Body() createClinic: createUserDto) {
        return this.userService.createDoctor(createClinic);
    }
}

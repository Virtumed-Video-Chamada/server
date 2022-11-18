import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/models/user.model';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoggedUser } from './decorators/logged-user.decorator';

@ApiTags('access')
@Controller('access')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Realizar login, recebendo um token de autenticação',
    })
    login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
        return this.authService.login(loginDto);
    }

    @Get()
    @UseGuards(AuthGuard())
    @ApiOperation({
        summary: 'Retorna o usuário autenticado no momento',
    })
    @ApiBearerAuth()
    profile(@LoggedUser() user: User) {
        return user;
    }
}

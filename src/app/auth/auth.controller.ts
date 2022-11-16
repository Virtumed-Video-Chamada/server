import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Realizar login.',
    })
    public async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @Post('register')
    @ApiOperation({
        summary: 'Registra o Usuário.',
    })
    public async register(@Body() body: Omit<RegisterDto, 'id'>) {
        return await this.authService.register(body);
    }
}

// {
//     "name": "Humberto",
//     "email": "humberto.araripe12@gmail.com",
//     "password": "Abc@1234"
//}

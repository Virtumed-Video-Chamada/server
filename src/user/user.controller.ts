import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register-doctor.dto';

@ApiTags('cadastrar')
@ApiBearerAuth()
@Controller('cadastrar')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('doctor')
    @ApiOperation({
        summary: 'Cadastrar um doutor',
    })
    async createUser(@Body() createUserDto: RegisterDto) {
        return this.userService.createUser(createUserDto);
    }
}

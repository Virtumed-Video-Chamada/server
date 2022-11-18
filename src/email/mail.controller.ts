import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDto } from './dto-recover-password/forgot-password.dto';
import { MailService } from './mail.service';

@ApiTags('mail')
@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post('send-recover-email')
    @ApiOperation({
        summary: 'Enviar email para recuperar senha',
    })
    async sendRecoverPasswordEmail(
        @Body() forgotPasswordDto: ForgotPasswordDto,
    ) {
        return this.mailService.sendRecoverPasswordEmail(
            forgotPasswordDto.email,
        );
    }
}

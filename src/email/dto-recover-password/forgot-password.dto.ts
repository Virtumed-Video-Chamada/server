import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class ForgotPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Email do Admin. Utilizado no login. Deve ser único',
        example: 'humberto.araripe12@gmail.com',
    })
    email: string;
}

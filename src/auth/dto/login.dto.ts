import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'e-mail do Usuário',
        example: 'admin@email.com',
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Senha do Usuário',
        example: 'Abc@1234',
    })
    password: string;
}

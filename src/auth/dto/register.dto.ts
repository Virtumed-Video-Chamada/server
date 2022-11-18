import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    Matches,
    IsEnum,
} from 'class-validator';

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'e-mail do Usuário',
        example: 'humberto.araripe12@gmail.com',
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(14)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    @ApiProperty({
        description: 'Senha do Usuário',
        example: 'Abc@1234',
    })
    password: string;

    @IsEnum(Role)
    @IsNotEmpty()
    @ApiProperty({
        description: 'permissões de usuário',
        example: 'Doctor',
    })
    role: Role;
}

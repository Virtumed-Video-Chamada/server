import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    Matches,
    IsArray,
    IsEnum,
} from 'class-validator';

import { Speciality } from 'src/models/user.model';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'nome do Usuário',
        example: 'Humberto',
    })
    name: string;

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

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(8)
    @ApiProperty({
        description: 'CRM do Usuário',
        example: '194528',
    })
    crm: string;

    @IsEnum(Role)
    @IsNotEmpty()
    @ApiProperty({
        description: 'permissões de usuário',
        example: 'Doctor',
    })
    role: Role;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Especialidade do médico',
        example: ['Alergologia', 'Angiologia'],
    })
    speciality: typeof Speciality;
}

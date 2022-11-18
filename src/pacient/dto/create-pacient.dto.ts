import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreatePacientDto {
    @IsOptional()
    @ApiProperty({
        description: 'Email do Admin. Utilizado no login. Deve ser único',
        example: 'user@email.com',
    })
    email: string;

    @IsOptional()
    @ApiProperty({
        description: 'Nome do User responsavel pela empresa.',
        example: 'User',
    })
    nameDoctor: string;

    @IsOptional()
    @ApiProperty({
        description: 'O nome da Empresa',
        example: 'Empresa Ltda',
    })
    crm: string;

    @IsOptional()
    @ApiProperty({
        description: 'O cnpj da empresa',
        example: '101.123.54/0001-54',
    })
    cpf: string;

    @IsOptional()
    @ApiProperty({
        description: 'O cnpj da empresa',
        example: '101.123.54/0001-54',
    })
    Speciality: string[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateClinicDto {
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
    nameClinic: string;

    @IsOptional()
    @ApiProperty({
        description: 'O telefone da empresa',
        example: '(30) 3030-3030',
    })
    phone: string;

    @IsOptional()
    @ApiProperty({
        description: 'O cep da empresa',
        example: '20020-050',
    })
    cep: string;

    @IsOptional()
    @ApiProperty({
        description: 'O cnpj da empresa',
        example: '101.123.54/0001-54',
    })
    cnpj: string;
}

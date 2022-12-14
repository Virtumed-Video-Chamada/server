import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Matches, MaxLength, MinLength } from 'class-validator';

export class CreatePacientDto {
    @IsOptional()
    @ApiProperty({
        description: 'Email do Paciente.',
        example: 'userJoelma@email.com',
    })
    email: string;

    @IsOptional()
    @ApiProperty({
        description: 'Nome do Paciente',
        example: 'Joelma',
    })
    namePacient: string;

    @IsOptional()
    @ApiProperty({
        description: 'O cpf do paciente.',
        example: '163.583.518-69',
    })
    cpf: string;

    @IsOptional()
    @MinLength(11)
    @MaxLength(11)
    @Matches(/[0-9 -()+]+$/, {
        message: 'invalid phone',
    })
    @ApiProperty({
        description: 'Telefone do Paciente.',
        example: '(22) (30) 3030-30300',
    })
    phone: string

    @IsOptional()
    @ApiProperty({
        description: 'Cep do Paciente.',
        example: '20020-050',
    })
    cep: string
}

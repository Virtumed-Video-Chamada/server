import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SchedulingDto {

    @IsString()
    @ApiProperty({
        description: 'Dias que faltam para a consulta com o médico.',
        example: '10',
    })
    day: string

    @IsString()
    @ApiProperty({
        description: 'Mes/meses que faltam para a consulta com o médico.',
        example: '10',
    })
    mounth: string

    @IsString()
    @ApiProperty({
        description: 'Ano/anos que faltam para a consulta com o médico.',
        example: '10',
    })
    year: string

    @IsString()
    @ApiProperty({
        description: 'Nome do médico agendado.',
        example: 'Alan',
    })
    name: string
}
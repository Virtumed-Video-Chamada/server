import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SchedulingDto {

    @IsNumber()
    @ApiProperty({
        description: 'Dias que faltam para a consulta com o médico.',
        example: 10,
    })
    day: number

    @IsNumber()
    @ApiProperty({
        description: 'Mes/meses que faltam para a consulta com o médico.',
        example: 10,
    })
    mounth: number

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
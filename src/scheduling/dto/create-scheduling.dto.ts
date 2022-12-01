import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SchedulingDto {

    @IsNumber()
    @ApiProperty({
        description: 'Dia que vai querer tomar o remédio.',
        example: 10,
    })
    day: number

    @IsNumber()
    @ApiProperty({
        description: 'Mês que vai querer tomar o remédio.',
        example: 10,
    })
    mounth: number

    @IsNumber()
    @ApiProperty({
        description: "Hora de tomar o remédio.",
        example: 10
    })
    hour: number

    @IsNumber()
    @ApiProperty({
        description: 'Minuto que vai querer tomar o remédio.',
        example: 30
    })
    minute: number
    
    @IsNumber()
    @ApiProperty({
        description: 'Dia da semana.',
        example: 1
    })
    dayOfWeek: number

    @IsString()
    @ApiProperty({
        description: 'Nome do remédio.',
        example: 'Dipirona',
    })
    name: string
    
}
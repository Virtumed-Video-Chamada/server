import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateScheduletDto {
    @IsOptional()
    @ApiProperty({
        description: 'Email do Paciente.',
        example: 'userJoelma@email.com',
    })
    date: Date;
    
    provider: string
}

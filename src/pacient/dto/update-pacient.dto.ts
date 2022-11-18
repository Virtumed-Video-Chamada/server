import { PartialType } from '@nestjs/swagger';
import { CreatePacientDto } from './create-pacient.dto';

export class UpdatePacientDto extends PartialType(CreatePacientDto) {}

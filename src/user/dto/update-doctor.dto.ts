import { PartialType } from '@nestjs/swagger';
import { RegisterDto } from './register-doctor.dto';

export class UpdateUserDto extends PartialType(RegisterDto) {}

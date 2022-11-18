import { PartialType } from '@nestjs/swagger';
import { ForgotPasswordDto } from './forgot-password.dto';

export class UpdateUserDto extends PartialType(ForgotPasswordDto) {}

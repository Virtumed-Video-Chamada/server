import { PartialType } from '@nestjs/swagger';
import { createUserDto } from './createUser.dto';

export class UpdateUserDto extends PartialType(createUserDto) {}

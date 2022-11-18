import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { PacientService } from './pacient.service';
import { CreatePacientDto } from './dto/create-pacient.dto';
import { UpdatePacientDto } from './dto/update-pacient.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pacient')
@Controller('pacient')
export class PacientController {
    constructor(private readonly pacientService: PacientService) {}

    @Post()
    create(@Body() createPacientDto: CreatePacientDto) {
        return this.pacientService.create(createPacientDto);
    }

    @Get()
    findAll() {
        return this.pacientService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pacientService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePacientDto: UpdatePacientDto,
    ) {
        return this.pacientService.update(+id, updatePacientDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pacientService.remove(+id);
    }
}

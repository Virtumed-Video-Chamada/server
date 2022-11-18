import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';

@ApiTags('clinic')
@Controller('clinic')
export class ClinicController {
    constructor(private readonly clinicService: ClinicService) {}

    @Post()
    create(@Body() createClinicDto: CreateClinicDto) {
        return this.clinicService.create(createClinicDto);
    }

    @Get()
    findAll() {
        return this.clinicService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clinicService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClinicDto: UpdateClinicDto) {
        return this.clinicService.update(+id, updateClinicDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clinicService.remove(+id);
    }
}

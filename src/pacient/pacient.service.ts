import { Injectable } from '@nestjs/common';
import { CreatePacientDto } from './dto/create-pacient.dto';
import { UpdatePacientDto } from './dto/update-pacient.dto';

@Injectable()
export class PacientService {
    create(createPacientDto: CreatePacientDto) {
        return 'This action adds a new pacient';
    }

    findAll() {
        return `This action returns all pacient`;
    }

    findOne(id: number) {
        return `This action returns a #${id} pacient`;
    }

    update(id: number, updatePacientDto: UpdatePacientDto) {
        return `This action updates a #${id} pacient`;
    }

    remove(id: number) {
        return `This action removes a #${id} pacient`;
    }
}

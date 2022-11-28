import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/user.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { createUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
    private userSelect = {
        id: true,
        email: true,
        password: false,
        role: false,
        createdAt: true,
        updateAt: true,
    };

    constructor(private readonly prisma: PrismaService) {}

    async createAdmin(dto: createUserDto): Promise<User> {
        await this.validPassword(dto);
        const newDoctor = await this.newAdmin(dto);
        return newDoctor;
    }

    async createPacient(dto: createUserDto): Promise<User> {
        await this.validPassword(dto);
        const newDoctor = await this.newPacient(dto);
        return newDoctor;
    }

    async createClinic(dto: createUserDto): Promise<User> {
        await this.validPassword(dto);
        const newDoctor = await this.newClinic(dto);
        return newDoctor;
    }

    async createDoctor(dto: createUserDto): Promise<User> {
        await this.validPassword(dto);
        const newDoctor = await this.newDoctor(dto);
        return newDoctor;
    }

    async validPassword(dto: createUserDto) {
        if (dto.password != dto.confirmPassword) {
            throw new BadRequestException(
                'As senhas informadas não são iguais.',
            );
        }

        delete dto.confirmPassword;
    }

    async hashPassword(dto: createUserDto): Promise<string> {
        const hashPassword = await bcrypt.hash(dto.password, 10);

        return hashPassword;
    }

    async newDoctor(dto: createUserDto): Promise<User> {
        const hashPassword = await this.hashPassword(dto);

        const newDoctor = await this.prisma.user
            .create({
                data: {
                    email: dto.email,
                    role: 'Doctor',
                    password: hashPassword,
                },
                select: this.userSelect,
            })
            .catch(handleError);

        return newDoctor;
    }

    async newAdmin(dto: createUserDto): Promise<User> {
        const hashPassword = await this.hashPassword(dto);

        const newAdmin = await this.prisma.user
            .create({
                data: {
                    email: dto.email,
                    role: 'Admin',
                    password: hashPassword,
                },
                select: this.userSelect,
            })
            .catch(handleError);

        return newAdmin;
    }

    async newClinic(dto: createUserDto): Promise<User> {
        const hashPassword = await this.hashPassword(dto);

        const newClinic = await this.prisma.user
            .create({
                data: {
                    email: dto.email,
                    role: 'Clinic',
                    password: hashPassword,
                },
                select: this.userSelect,
            })
            .catch(handleError);

        return newClinic;
    }

    async newPacient(dto: createUserDto): Promise<User> {
        const hashPassword = await this.hashPassword(dto);

        const newPacient = await this.prisma.user
            .create({
                data: {
                    email: dto.email,
                    role: 'Pacient',
                    password: hashPassword,
                },
                select: this.userSelect,
            })
            .catch(handleError);

        return newPacient;
    }

    //<----------------- Lógica de deletar por ID ------------------>//
    async delete(id: string) {
        await this.prisma.user.delete({ where: { id } });
    }
    //<----------------------------------->//
}
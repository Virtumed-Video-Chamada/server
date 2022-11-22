import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class DoctorService {
    private userSelect = {
        id: true,
        email: true,
        password: false,
        role: false,
        doctorId: false,
        pacientId: false,
        clinicId: false,
        createdAt: true,
        updateAt: true,
    };
    constructor(private readonly prisma: PrismaService) {}

    //<-------------- Lógica de encontrar Todos --------------------->//
    async findAll(): Promise<User[]> {
        const doctors = await this.validUsersExist();
        return doctors;
    }

    async findAllDoctors(): Promise<User[]> {
        const doctors = await this.prisma.user.findMany({
            where: {
                role: 'Clinic',
            },
            include: {
                Clinic: {
                    select: {
                        doctor: true,
                    },
                },
            },
        });

        return doctors;
    }

    async validUsersExist(): Promise<User[]> {
        const doctors = await this.findAllDoctors();

        if (!doctors) {
            throw new NotFoundException(
                `Nenhum registro de doutores encontrado.`,
            );
        }

        return doctors;
    }
    //<----------------------------------->//

    //<----------------- Lógica de encontar por ID ------------------>//
    async findById(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: this.userSelect,
        });

        if (!user) {
            throw new NotFoundException(
                `Registro com o ID '${id}' não encontrado.`,
            );
        }

        delete user.password;

        return user;
    }

    async findOne(id: string): Promise<User> {
        const user = await this.findById(id);

        return user;
    }
    //<----------------------------------->//

    //<----------------- Lógica de atualizar por ID ------------------>//
    async updateDoctor(id: string, dto: CreateDoctorDto): Promise<User> {
        await this.prisma.user.findUnique({
            where: { id },
            include: {
                Doctor: true,
            },
        });

        return this.prisma.user.update({
            where: {
                id,
            },
            data: {
                email: dto.email,
                Doctor: {
                    update: {
                        Speciality: dto.Speciality,
                        nameDoctor: dto.nameDoctor,
                        cpf: dto.cpf,
                        crm: dto.crm,
                        clinicId: id,
                    },
                },
            },
        });
    }
    //<----------------------------------->//
}

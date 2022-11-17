import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/user.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { RegisterDto } from './dto/register-doctor.dto';

@Injectable()
export class UserService {
    private userSelect = {
        id: true,
        name: true,
        email: true,
        password: false,
        role: true,
        createdAt: true,
        updateAt: true,
    };

    constructor(private readonly prisma: PrismaService) {}

    async createUser(dto: RegisterDto): Promise<User> {
        if (dto.password != dto.confirmPassword) {
            throw new BadRequestException(
                'As senhas informadas não são iguais.',
            );
        }

        delete dto.confirmPassword;

        const hashPassword = await bcrypt.hash(dto.password, 10);

        const newDoctor = await this.prisma.user
            .create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    role: 'Admin',
                    password: hashPassword,
                },
                select: this.userSelect,
            })
            .catch(handleError);

        await this.prisma.user.update({
            where: {
                email: dto.email,
            },
            data: {
                password: hashPassword,
            },
        });

        return newDoctor;
    }
}

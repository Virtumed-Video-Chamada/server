import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from './dto/login-response.dto';
import { User } from 'src/models/user.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    private userSelect = {
        id: true,
        email: true,
        password: true,
        role: false,
        doctorId: false,
        pacientId: false,
        clinicId: false,
        createdAt: true,
        updateAt: true,
    };

    async validUserExist(email: string): Promise<User> {
        // Procura e checa se o user existe, usando o email
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: this.userSelect,
        });

        if (!user) {
            throw new UnauthorizedException('Usuário e/ou senha inválidos!');
        }

        return user;
    }

    async validPassword(password: string, user: User) {
        // Valida se a senha informada é correta
        const isHashValid = await bcrypt.compare(password, user.password);

        if (!isHashValid) {
            throw new UnauthorizedException('Usuário e/ou senha inválidos!');
        }

        delete user.password;
    }

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        const { email, password } = loginDto;

        const user = await this.validUserExist(email);
        await this.validPassword(password, user);

        return {
            token: this.jwtService.sign({ email }),
            user,
        };
    }
}

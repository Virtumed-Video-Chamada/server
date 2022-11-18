import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { generate } from 'generate-password';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/user.model';

@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService,
        private readonly prisma: PrismaService,
    ) {}

    private userSelect = {
        id: true,
        email: true,
        password: false,
        role: true,
        createdAt: true,
        updateAt: true,
    };

    async findByEmail(email: string): Promise<User> {
        const record = await this.prisma.user.findUnique({
            where: { email },
            select: this.userSelect,
        });

        if (!record) {
            throw new NotFoundException(
                `Registro com o ID '${email}' não encontrado.`,
            );
        }

        delete record.password;

        return record;
    }

    async sendRecoverPasswordEmail(email: string): Promise<void> {
        const user = await this.findByEmail(email);

        const newPassord = generate({
            length: 12,
            numbers: true,
            symbols: true,
        });

        const updatedPassword = await bcrypt.hash(newPassord, 10);

        await this.prisma.user
            .update({
                where: { email },
                data: {
                    password: updatedPassword,
                },
                select: this.userSelect,
            })
            .catch(handleError);

        await this.mailerService
            .sendMail({
                to: user.email,
                from: `${process.env.MAIL_FROM}`,
                subject: 'Recuperação de senha!!',
                html: `
                <html>
                    <body>
                        <center>
                            <div style='background-color: #d3d3d3; max-width: 840px; margin: 0; padding: 30px;'>

                                <img style='
                                    width: 250px;
                                    height: 200px;
                                    margin: 5px 5px 5px 0;
                                    display:inline-block;' 
                                ;
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCXq-EB6MThpAi6dAfDphCYzcQ-_TMBbJSVg&usqp=CAU"
                                >
                                <h1 style='color: #292536; text-align: center; padding-top: 20px;'>Recuperação de Senha - Virtumed-Vídeo</h1>

                                <h2 style='color: #292536; text-align: center'>Sua nova senha é</h2>

                                <p style='color: #292536; text-align: center; font-size: 18px'>${newPassord}
                                <p>

                                <div
                                    style='margin: 20px auto; width: 180px; padding: 10px 20px; background-color: #442d52; border-radius: 5px; text-align: center;'>
                                    <a href='https://atip-client.vercel.app/login' target='_blank' rel='noopener noreferrer'
                                        style='text-decoration: none; color: #fcfcfc; font-size: 18px; margin: 0 auto;'>Acesse
                                    </a>
                                </div>

                            </div>
                        </center>
                    </body>
                </html>
                `,
            })
            .then(() => {
                return 'Foi enviado um email com instruções para acessar sua conta';
            })
            .catch(() => {
                return handleError;
            });
    }
}

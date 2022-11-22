import { Prisma, PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const users: Prisma.UserCreateInput[] = [
    {
        email: 'admin@email.com',
        password: 'Abc@1234',
        role: Role.Admin,
        Clinic: {
            create: {
                nameClinic: 'José Paulo',
                cnpj: '97.193.834/0001-00',
                phone: '(91) 3320-3270',
                cep: '06703-530',
                doctor: {
                    create: {
                        nameDoctor: 'bOCÓ',
                        cpf: '97.193.224/0001-00',
                        crm: '2945678',
                    },
                },
            },
        },
    },
    {
        email: 'doctor@email.com',
        password: 'Abc@1234',
        role: 'Doctor',
    },
    {
        email: 'clinic@email.com',
        password: 'Abc@1234',
        role: 'Clinic',
    },
    {
        email: 'pacient@email.com',
        password: 'Abc@1234',
        role: 'Pacient',
    },
];

export const user = async (prisma: PrismaClient) => {
    for (const obj of Object.values(users)) {
        await prisma.user.upsert({
            where: { email: obj.email },
            update: {},
            create: {
                ...obj,
                password: await bcrypt.hash(obj.password, 10),
            },
        });
    }
};

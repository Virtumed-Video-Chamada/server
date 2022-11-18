import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const users: Prisma.UserCreateInput[] = [
    {
        email: 'admin@email.com',
        password: 'Abc@1234',
        role: 'Admin',
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

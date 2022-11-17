import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const users: Prisma.UserCreateInput[] = [
    {
        name: 'Admin',
        email: 'admin@email.com',
        password: 'Abc@1234',
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

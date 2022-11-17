import { Role } from '@prisma/client';

export const Speciality: string[] = [
    'Alergologia',
    'Angiologia',
    'Buco maxilo',
    'Cardiologia clínca',
    'Cardiologia infantil',
    'Cirurgia cabeça e pescoço',
    'Cirurgia cardíaca',
    'Cirurgia de tórax',
];

export class User {
    id: string;
    email: string;
    name: string;
    password: string;
    crm?: string;
    role?: Role;
    speciality?: typeof Speciality;
}

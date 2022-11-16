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

export enum Role {
    Admin,
    Doctor,
    Pacient,
}

export class User {
    id: string;
    name: string;
    crm?: string;
    role: Role;
    speciality?: typeof Speciality;
    email: string;
    password: string;
}

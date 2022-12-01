import { Doctor, Pacient } from "@prisma/client";

export class Agend{
    id?:string;
    day: string;
    mounth:string;
    minute:string;
    hour:string;
    pacient?:Pacient[];
    doctor?:Doctor[];
}
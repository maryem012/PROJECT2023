/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { Role } from 'src/enum/role.enum';

export interface Users extends Document {
    firstName: string,
    LastName: string,
    birthdate: Date;
    gender: string;
    email: string;
    password: string;
    phone: number;
    role: Role;
}
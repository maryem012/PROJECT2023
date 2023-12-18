/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface Userauth extends Document {
  readonly password: string;
   email: string;
   phone?: number;
   firstName?: string;
   lastName?: string;
gender:string;
   birthdate?: Date;
  role: string;
 department?:string
  

}

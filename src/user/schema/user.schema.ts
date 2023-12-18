/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';
import { Role } from 'src/enum/role.enum';

export const UserSchema = new Schema({
  firstName: String,
  LastName: String,
  birthdate: Date,
  
  gender: String,
  adress: String,
  email: String,
  password: String,
  phone: Number,
  department:String,


  role: {
    type: String,
    enum: Role,
  },
});

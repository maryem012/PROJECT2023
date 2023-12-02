/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Role } from 'src/enum/role.enum';

export const UserauthSchema = new mongoose.Schema({


  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    //required: true
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
 
  gender: {
    type: String,
    //required: true
  },
  job: {
    type: String,
    // required: true
  },
  birthdate: {
    type: Date,
  },

  role: {
    type: String,
    enum: Role
  },

});

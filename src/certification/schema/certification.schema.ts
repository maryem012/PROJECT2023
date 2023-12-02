import { Schema } from 'mongoose';

export const certificationSchema = new Schema({
   createdAt: Date,
    optainedAt:   Date,
    provider:   String,
   studentName:String,
   studentId:String,
   file:String,
   Title:String

});
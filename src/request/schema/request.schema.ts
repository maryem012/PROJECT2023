import { Schema } from 'mongoose';

export const requestSchema = new Schema({
    createdAt: Date,
    department: String,
    description: String,
    subject: String,
    requestStatus: String,
    studentId: String,
    studentName: String,
    status:String
});
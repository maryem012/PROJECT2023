import { Schema } from 'mongoose';

export const complaintSchema = new Schema({
    createdAt: Date,
    department: String,
    description: String,
    subject: String,
    complaintStatus: String,
    studentId: String,
    studentName:String,
    status:String,

});
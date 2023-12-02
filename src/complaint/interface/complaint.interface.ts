
export interface complaint extends Document {
    studentId: string
    studentName:string
    createdAt: Date
    department?: string
    description?: string
    subject: string
    status:string
}
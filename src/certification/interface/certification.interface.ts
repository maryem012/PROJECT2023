
export interface certification extends Document {
    studentName: string
    studentId:string
    createdAt: Date
    optainedAt: Date
    Title: string
    provider: string
    file?:string
}
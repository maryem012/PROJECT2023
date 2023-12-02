import { User } from "./user"

export interface complaint  {
  studentId: string
  studentName:string
  department?: string
  description?: string
  subject: string
  createdAt:Date,
  status:string,

}

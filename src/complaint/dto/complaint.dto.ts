import { ApiProperty } from "@nestjs/swagger"

export class complaintDto{
   
    @ApiProperty()

    studentId: string
    @ApiProperty()

    studentName:string
    @ApiProperty()
    createdAt: Date
    @ApiProperty()

    department?: string
    @ApiProperty()

    description?: string
    @ApiProperty()

    subject: string
    @ApiProperty()
    status?: string
}
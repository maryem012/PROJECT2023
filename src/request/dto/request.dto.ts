import { ApiProperty } from "@nestjs/swagger"

export class requestDto{
    @ApiProperty()

    studentId: string
    @ApiProperty()

    studentName: string   
    @ApiProperty()

     createdAt: Date
     @ApiProperty()

    department?: string
    @ApiProperty()

    description?: string
    @ApiProperty()

    subject: string
    @ApiProperty()

    request:string
}
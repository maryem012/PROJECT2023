import { ApiProperty } from "@nestjs/swagger"

export class certificationDto{

    @ApiProperty()
    studentId: string
    @ApiProperty()
    studentName:string
    @ApiProperty()  
    createdAt: Date
    @ApiProperty()  
    optainedAt: Date
    @ApiProperty()  
    provider: string
    @ApiProperty()  
    file?:string
    @ApiProperty()  
    Title:string
}
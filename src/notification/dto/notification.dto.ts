import { ApiProperty } from "@nestjs/swagger"

export class notidicationDto{
    @ApiProperty()
    userId: string;
    @ApiProperty()
    message: string;
    @ApiProperty()
    timestamp: Date;


}
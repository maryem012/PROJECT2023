/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/enum/role.enum';

export class UserDto {
  
  @ApiProperty()
   firstName:string;
  @ApiProperty()
   LastName:string;
   @ApiProperty()
   birthdate: Date;
  @ApiProperty()
   gender: string;
  @ApiProperty()
   email: string;
  @ApiProperty()
   password: string;

  @ApiProperty()
   phone: number;
  @ApiProperty()
  readonly role: Role;

}

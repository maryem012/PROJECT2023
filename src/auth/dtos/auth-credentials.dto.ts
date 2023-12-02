/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, isEmail, isEnum, IsNotEmpty, IsNumber, isPhoneNumber, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'veuillez entrer votre password' })
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  password: string;
  @IsEmail()
  @IsNotEmpty({ message: 'veuillez entrer votre email' })

  @ApiProperty()
  email: string;
  @ApiProperty()
  phone?: number;
  @ApiProperty()
  role: string;
  @ApiProperty()
  firstName?: string;
  @ApiProperty()
  lastName?: string;
  @ApiProperty()
  gender: string;
  
  @ApiProperty()
  birthdate?: Date;



}

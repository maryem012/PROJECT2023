import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res, UseInterceptors } from '@nestjs/common';
import { response } from 'express';
import { MorganInterceptor } from 'nest-morgan';
import { UserDto } from './dto/user.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('user')
export class UserController {constructor(private readonly userService: UserService) {}
//@UseGuards(AuthGuard('Admin'))
@Post('/create')
@ApiCreatedResponse({ type: UserDto })
async createUser(@Res() res, @Body() userDTO: UserDto) {
  const User = await await this.userService.createUser(userDTO);
  return res.status(HttpStatus.OK).json({
    message: 'User Successfully Created',
    User,
  });
}
//@UseGuards(AuthGuard('Admin'))
@Get('/')
@ApiOkResponse({ type: [UserDto] })

//@UseGuards(AuthGuard('Admin'))

async getUsers(@Res() res) {
  const Users = await this.userService.getUsers();
  return res.status(HttpStatus.OK).json(Users);
}
//@UseGuards(AuthGuard('Admin'))
@Get('/:id')
@ApiCreatedResponse({ type: UserDto })

async getUser(@Res() response, @Param('id') UserId: string) {
 try {
    const existingUser = await
this.userService.getUser(UserId);
    return response.status(HttpStatus.OK).json({
    message: 'User found successfully',existingUser,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@UseInterceptors(MorganInterceptor('combined'))
//@UseGuards(AuthGuard('Admin'))
@Delete('/:id')
@ApiOkResponse({ type: UserDto })
async deleteUser(@Res() res, @Param('id') userId: string)
{
  try {
    const deletedusr = await this.userService.deleteUser(userId);
    return res.status(HttpStatus.OK).json({
    message: 'user deleted successfully',
    deletedusr,});
  }catch (err) {
    return res.status(err.status).json(err.res);
  }}

//@UseGuards(AuthGuard('Admin'))
@Put('/:id')
async updateUser(@Res() response,@Param('id') userID: string,
@Body() UserDto: UserDto) {
  const updatedUser = await this.userService.updateUser(userID, UserDto);
  console.log(updatedUser)
  if (!updatedUser) 
  throw new NotFoundException('User does not exist!');
  return response.status(HttpStatus.OK).json({
    message: 'User Updated Successfully',
    updatedUser,
  });
}catch (err) {
    return response.status(err.status).json(err.response);
  }}

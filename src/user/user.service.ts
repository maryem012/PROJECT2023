import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { Users } from './interface/user.interface';

@Injectable()
export class UserService {constructor(@InjectModel('Users') private readonly UserModel: Model<Users>) {}

async getUsers(): Promise<Users[]> {
  const Users = await this.UserModel.find();
  return Users;
}

async getUser(UserId:string): Promise<Users> {
  const existingUser = await this.UserModel.findById(UserId)
  console.log(existingUser)
  if (!existingUser) {
    throw new NotFoundException(`User #${UserId} not found`);
   }
   return existingUser;
  }



async getUserByName(LastName: string ): Promise<Users> {
  const user = await this.UserModel.findOne({ LastName });
  if (!user) return null;

  return user;
}
    
async getUserByEmail(email: string): Promise<Users> {
  const user = await this.UserModel.findOne({ email });

  if (!user) return null;

  return user;
}
async findOne(Email: string): Promise<Users> {
  const user = await this.UserModel.findOne({ where: {Email } });

  if (!user) return null;

  return user;
}

async createUser(userDto: UserDto): Promise<Users> {
  const newUser = new this.UserModel(userDto);
  return newUser.save();
}

async deleteUser(userId: string): Promise<Users> {
  const deletedUser= await this.UserModel.findByIdAndDelete(userId)
  ;
 if (!deletedUser) {
   throw new NotFoundException(`user #${userId} not found`);
 }
 return deletedUser;
}

async updateUser(userId: string, UserDto: UserDto): Promise<Users> {
  const existingUser = await this.UserModel.findByIdAndUpdate(userId, UserDto);
  console.log(existingUser)

  if (!existingUser) {
    throw new NotFoundException(`user #${userId} not found`);
  }
  return existingUser;
}}

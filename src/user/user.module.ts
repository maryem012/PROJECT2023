/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MorganModule } from 'nest-morgan';
import { UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [ MorganModule,
        MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }

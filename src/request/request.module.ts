/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { MongooseModule } from '@nestjs/mongoose';
import { requestSchema } from './schema/request.schema';

@Module({
    imports: [    MongooseModule.forFeature([{ name: 'requests', schema: requestSchema }])
],
    controllers: [RequestController],
    providers: [RequestService],
})
export class RequestModule { }

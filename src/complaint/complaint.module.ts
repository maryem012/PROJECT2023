/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { complaintSchema } from './schema/complaint.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ComplaintController } from './complaint.controller';
import { ComplaintService } from './complaint.service';

@Module({
    imports: [    MongooseModule.forFeature([{ name: 'complaint', schema: complaintSchema }])
],
    controllers: [ComplaintController],
    providers: [ComplaintService],
})
export class ComplaintModule { }

/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { complaintSchema } from './schema/complaint.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ComplaintController } from './complaint.controller';
import { ComplaintService } from './complaint.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
    imports: [    MongooseModule.forFeature([{ name: 'complaint', schema: complaintSchema }]),
    NotificationModule// Ensure NotificationModule is imported here

],
    controllers: [ComplaintController],
    providers: [ComplaintService],
})
export class ComplaintModule { }

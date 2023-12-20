import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationModule } from 'src/notification/notification.module';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { requestSchema } from './schema/request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'requests', schema: requestSchema }]),
    NotificationModule, // Ensure NotificationModule is imported here
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}

// NotificationModule
import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationSchema } from './schema/notification.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationService } from './notification.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'notification', schema: NotificationSchema }])],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}

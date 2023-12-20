import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel('notification') private readonly notificationModel: Model<Notification>,
      ) {}
    
      async createNotification(userId: string, message: string): Promise<Notification> {
        const notification = new this.notificationModel({ userId, message });
          console.log(`Creating notification for user ${userId}: ${message}`);
  // Notification creation logic...
  console.log(`Notification created for user ${userId}`);
        return await notification.save();
        
      }
    
      async getNotificationsForUser(userId: string): Promise<Notification[]> {
        return await this.notificationModel.find({ userId }).exec();
      }
}

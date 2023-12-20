import { Controller, Get, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { notidicationDto } from './dto/notification.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('notification')
export class NotificationController {
        constructor(private readonly notificationService: NotificationService) {}
        @ApiOkResponse({ type: notidicationDto })

        @Post(':userId/:message')
        async createNotification(
          @Param('userId') userId: string,
          @Param('message') message: string,
        ): Promise<any> {
          return await this.notificationService.createNotification(userId, message);
        }
        @Get(':userId')
        async getNotificationsForUser(@Param('userId') userId: string): Promise<Notification[]> {
          return this.notificationService.getNotificationsForUser(userId);
        }
}

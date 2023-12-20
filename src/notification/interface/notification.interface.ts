// notification.interface.ts
import { Document } from 'mongoose';

export interface Notification extends Document {
  userId: string;
  message: string;
  timestamp: Date;
  // Add other necessary fields for your notifications
}
import * as mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  // Define other fields and their types as needed
});

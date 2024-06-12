import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  from: String,
  message: String,
  roomId: String,
  userId: String,
});

export const Message = mongoose.model('Message', MessageSchema);

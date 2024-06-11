import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  from: String,
  message: String,
  roomId: String,
});

export const Message = mongoose.model('Message', MessageSchema);

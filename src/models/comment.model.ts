import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
  id: String,
  userId: { type: mongoose.Types.ObjectId, ref: 'User' },
  message: String,
  postedAt: { type: Date, default: Date.now() },
  issueId: { type: mongoose.Types.ObjectId, ref: 'Issue' },
});

export const Issue = mongoose.model('Comment', CommentSchema);

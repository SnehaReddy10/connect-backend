import mongoose, { Schema } from 'mongoose';

const IssueSchema = new Schema({
  id: String,
  userId: { type: mongoose.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  votes: { type: Number, default: 0 },
});

export const Issue = mongoose.model('Issue', IssueSchema);

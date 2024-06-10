import mongoose, { Schema } from 'mongoose';

const IssueSchema = new Schema({
  id: String,
  title: String,
  description: String,
  votes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment', default: [] }],
});

export const Issue = mongoose.model('Issue', IssueSchema);

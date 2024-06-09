import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  id: String,
  username: String,
  name: String,
  password: String,
  email: String,
});

export const User = mongoose.model('User', UserSchema);

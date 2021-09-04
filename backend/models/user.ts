import { Schema } from "mongoose";
import mongoose  from "../db";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  bio: {
    type: String,
  },
  bookmarks: {
    type: [String]
  },
  followers: {
    type: [String]
  },
  following: {
    type: [String]
  },
  blogs: [{
    type: Schema.Types.ObjectId,
    ref: 'Blog'
  }]
});

const User = mongoose.model('User', userSchema);

export { User };

import { Schema } from "mongoose";
import mongoose  from "../db";
import { commentSchema } from "./comment";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  comments: {
    type: [commentSchema]
  },
  likes: {
    type: [String]
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Blog = mongoose.model('Blog', blogSchema);

export { Blog };

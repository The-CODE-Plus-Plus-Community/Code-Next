import mongoose  from "../db";
import { commentSchema } from "./comment";

const blogSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
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
  }
});

const Blog = mongoose.model('Blog', blogSchema);

export { Blog };

import mongoose  from "../db";

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
    type: Array
  },
  likes: {
    type: [String]
  }
});

const Blog = mongoose.model('Blog', blogSchema);

export { Blog };

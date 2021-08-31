import mongoose  from "../db";

const commentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

export { commentSchema };
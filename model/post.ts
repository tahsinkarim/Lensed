import { Schema, models, model } from "mongoose";

const postSchema = new Schema({
  caption: {
    type: String,
    required: true,
  },
  postedBy: {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  comments: [
    {
      userId: String,
      comment: String,
      date: Date,
    },
  ],
  likes: [
    {
      userId: String,
      date: Date,
    },
  ],
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Posts = models.post || model("post", postSchema);

export default Posts;

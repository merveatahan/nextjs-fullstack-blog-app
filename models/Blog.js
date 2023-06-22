import mongoose, { Schema, model, models } from "mongoose";

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 4,
  },
  description: {
    type: String,
    required: true,
    min: 6,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  // images: [{ type: String }],
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
export const Blog = models.Blog || model("Blog", BlogSchema);

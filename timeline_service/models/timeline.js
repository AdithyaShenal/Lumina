import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  post_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  image_url: {
    type: String,
    required: true,
  },
  image_name: {
    type: String,
    required: true,
  },
  time_stamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  caption: {
    type: String,
  },
  location: {
    type: String,
  },
  post_type: {
    type: String,
    enum: ["Image"],
    default: "Image",
  },
});

const timelineSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  posts: [postSchema],
});

const Timeline = mongoose.model("Timelines", timelineSchema);

export function validate(body) {}

export default Timeline;

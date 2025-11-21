import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 5,
      maxlength: 50,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      minlength: 5,
      maxlength: 50,
      required: true,
    },
    last_name: {
      type: String,
      minlength: 5,
      maxlength: 50,
      required: true,
    },
    profile_image: {
      url: { type: String, maxlength: 1024 },
      blob_name: { type: String, maxlength: 1024 },
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
      unique: true,
    },
    phone_number: {
      type: String,
      minlength: 10,
      maxlength: 20,
    },
    age: {
      type: Number,
      min: 0,
      max: 80,
    },
    email_notifications: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      maxlength: 50,
    },
    interests: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export function userEventsValidate(user) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(50).required(),
    first_name: Joi.string().min(5).max(50).required(),
    last_name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().min(5).max(50).required(),
    email_notifications: Joi.bool().optional(),
    profile_image: Joi.object(),
    phone_number: Joi.string().min(10).max(20),
    age: Joi.number().min(0).max(80),
    location: Joi.string().min(2).max(50),
    interests: Joi.array().items(Joi.string()),
  });

  return schema.validate(user);
}

export default User;

import mongoose from "mongoose";
import Joi from "joi";

const followerSchema = new mongoose.Schema({
  user_id: {
    type: String,
    maxlength: 36,
    required: true,
  },
  target_user_id: {
    type: String,
    maxlength: 36,
    required: true,
  },
});

followerSchema.index({ user_id: 1, target_user_id: 1 }, { unique: true });

const Follower = mongoose.model("Followers", followerSchema);

export async function followerValidate(body) {
  const schema = Joi.object({
    user_id: Joi.string().max(36).required(),
    target_user_id: Joi.string().max(36).required(),
  });

  return schema.validate(body);
}

export default Follower;

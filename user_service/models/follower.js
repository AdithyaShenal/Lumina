import mongoose from "mongoose";
import Joi from "joi";
import joiObjectid from "joi-objectid";
Joi.objectId = joiObjectid(Joi);

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

export function validate(body) {
  const schema = Joi.object({
    target_user_id: Joi.objectId().required(),
  });

  return schema.validate(body);
}

export default Follower;

// Custom Joi validate structure

// id: Joi.objectId()
//   .required()
//   .custom((value, helpers) => {
//     if (!value) return helpers.error("any.required");
//     return value;
//   }, "custom validation")
//   .messages({
//     "any.required": `"id" is required`,
//     "string.pattern.name": `"id" must be a valid MongoDB ObjectId`,
//   }),

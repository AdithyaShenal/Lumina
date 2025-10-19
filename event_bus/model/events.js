import mongoose from "mongoose";
import Joi from "joi";

const eventSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "userRegistered",
      "userUpdated",
      "postCreated",
      "postUpdated",
      "postDeleted",
    ],
    required: true,
  },
  data: { type: Object, required: true },
});

const Events = mongoose.model("Events", eventSchema);

export async function validation(body) {
  const schema = Joi.object({
    type: Joi.string()
      .valid(
        "userRegistered",
        "userUpdated",
        "postCreated",
        "postUpdated",
        "postDeleted"
      )
      .required(),
    data: Joi.required(),
  });

  return await schema.validateAsync(body);
}

export default Events;

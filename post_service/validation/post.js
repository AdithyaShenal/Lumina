import Joi from "joi";

export default function validate(body) {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    caption: Joi.string(),
    post_type: Joi.string().max(50),
    location: Joi.string().max(255),
  });

  return schema.validate(body);
}

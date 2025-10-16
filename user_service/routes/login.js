import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import _ from "lodash";
import config from "config";
import Joi from "joi";
import express from "express";
const router = express.Router();

// Register Users
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  const isValidPwd = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPwd)
    return res.status(400).json({ message: "Invalid email or password" });

  const token = jwt.sign(
    { _id: user.id, isAdmin: user.isAdmin },
    config.get("jwtPrivateKey")
  );

  res
    .header("Auth-token", token)
    .json(_.pick(user, ["_id", "username", "email"]));
});

// Validation Login Service
const validate = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(user);
};

export default router;

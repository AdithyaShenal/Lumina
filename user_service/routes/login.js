import express from "express";
const router = express.Router();
import Joi from "joi";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import config from "config";
import bcrypt from "bcrypt";
import _ from "lodash";
import { success } from "zod";

// Login Users
// (Chekced - Successfull)
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });

  let user = await User.findOne({ email: req.body.email });

  if (!user)
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });

  const isValidPwd = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPwd)
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });

  const token = jwt.sign(
    { _id: user.id, isAdmin: user.isAdmin },
    config.get("jwtPrivateKey")
  );

  res.cookie("authToken", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60,
  });

  res.status(201).json({ success: true, message: "Successfully logged in" });
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

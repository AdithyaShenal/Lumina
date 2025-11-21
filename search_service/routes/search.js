import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import User from "../models/user.js";

// Get a User details by user ID
router.get("/id/:id", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select(
    "-email_notifications -createdAt -updatedAt -age"
  );

  if (!user)
    return res.status(404).json({ success: false, message: "No user found" });

  res.status(200).json(user);
});

// Get all users available
router.get("/all", auth, async (req, res) => {
  const users = await User.find().select(
    "-email_notifications -createdAt -updatedAt -age"
  );

  console.log(users);

  res.status(200).json(users);
});

// Search a User by Name -> Response: List of matching users
router.get("/name/:name", auth, async (req, res) => {
  const name = req.params.name.trim();
  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "No user name provided" });

  const users = await User.find({
    $or: [
      { username: { $regex: name, $options: "i" } },
      { first_name: { $regex: name, $options: "i" } },
      { last_name: { $regex: name, $options: "i" } },
    ],
  }).select("-email_notifications -createdAt -updatedAt -age");

  return res.status(200).json(users);
});

export default router;

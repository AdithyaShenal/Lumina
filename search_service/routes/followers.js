import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import Follower from "../models/follower.js";
import User from "../models/user.js";

// Get all followers of the Current User
router.get("/", auth, async (req, res) => {
  const followers = await Follower.find({ target_user_id: req.user._id });

  if (followers.length === 0) return res.status(200).json([]);

  const followerIds = followers.map((f) => f.user_id);

  const followerUsers = await User.find({ _id: { $in: followerIds } });

  return res.status(200).json(followerUsers);
});

// Get all the following users of the Current User (me -> others)
router.get("/following", auth, async (req, res) => {
  const following = await Follower.find({ user_id: req.user._id });

  if (following.length === 0) return res.status(200).json([]);

  const followingIds = following.map((f) => f.target_user_id);

  const followingUsers = await User.find({ _id: { $in: followingIds } });

  return res.status(200).json(followingUsers);
});

// Get followers of ANY user
router.get("/:userId", auth, async (req, res) => {
  const userId = req.params.userId;

  const followers = await Follower.find({ target_user_id: userId });
  if (!followers.length) return res.status(200).json([]);

  const ids = followers.map((f) => f.user_id);
  const users = await User.find({ _id: { $in: ids } });

  return res.status(200).json(users);
});

// Get following of ANY user
router.get("/:userId/following", auth, async (req, res) => {
  const userId = req.params.userId;

  const following = await Follower.find({ user_id: userId });
  if (!following.length) return res.status(200).json([]);

  const ids = following.map((f) => f.target_user_id);
  const users = await User.find({ _id: { $in: ids } });

  return res.status(200).json(users);
});

export default router;

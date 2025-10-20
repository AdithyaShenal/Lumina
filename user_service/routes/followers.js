import express from "express";
const router = express.Router();
import Follower, { validate } from "../models/follower.js";
import auth from "../middleware/auth.js";
import axios from "axios";

// A user following another user (following request)
router.post("/:user_id/:target_user_id", auth, async (req, res) => {
  const { error } = await validate({
    user_id: req.params.user_id,
    target_user_id: req.params.target_user_id,
  });

  if (error) return res.status(400).json({ message: error.details[0].message });

  let followers;

  try {
    followers = new Follower({
      user_id: req.params.user_id,
      target_user_id: req.params.target_user_id,
    });

    await followers.save();
  } catch (err) {
    if (err.code === 11000) {
      // For Duplicate key error handling
      return res.status(400).json({ message: "Already following" });
    }
    return next(err);
  }

  const message = {
    type: "createdFollowing",
    data: {
      user_id: followers.user_id,
      target_user_id: followers.target_user_id,
    },
  };

  // -------------------------- sending event

  axios
    .post("http://localhost:3005/api/events/", message)
    .catch((err) => console.log(err));

  // --------------------------

  res.status(201).json(followers);
});

// A User unfollowing a followed user
router.post("/unfollow/:user_id/:target_user_id", auth, async (req, res) => {
  const { error } = await validate({
    user_id: req.params.user_id,
    target_user_id: req.params.target_user_id,
  });

  if (error) return res.status(400).json({ message: error.details[0].message });

  const result = await Follower.deleteOne(
    {
      user_id: req.params.user_id,
      target_user_id: req.params.target_user_id,
    }
    // { new: true } this method exists only for
    // findByIdAndUpdate/findOneAndUpdate
    // /findOneAndReplace/findByIdAndReplace
  );

  // -------------------------- sending event

  const message = {
    type: "createdUnfollowing",
    data: {
      user_id: req.params.user_id,
      target_user_id: req.params.target_user_id,
    },
  };

  axios
    .post("http://localhost:3005/api/events/", message)
    .catch((err) => console.log(err.message));

  // --------------------------

  res.status(200).json(result);
});

export default router;

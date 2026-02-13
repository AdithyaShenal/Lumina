import express from "express";
const router = express.Router();
import Follower, { validate } from "../models/follower.js";
import auth from "../middleware/auth.js";
import { natsClient } from "../events/nats-client.js";
import UserFollowedPublisher from "../events/publishers/user-followed-publisher.js";
import UserUnfollowedPublisher from "../events/publishers/user-unfollowed-publisher.js";

// A user following another user (following request) (Checked Successfull)
router.post("/:target_user_id", auth, async (req, res) => {
  const { error } = validate({
    target_user_id: req.params.target_user_id,
  });

  if (req.user._id === req.params.target_user_id) {
    return res.status(400).send({ success: false, message: "Invalid Request" });
  }

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  let followers;

  try {
    followers = new Follower({
      user_id: req.user._id,
      target_user_id: req.params.target_user_id,
    });

    await followers.save();
  } catch (err) {
    if (err.code === 11000) {
      // For Duplicate key error handling
      return res
        .status(201)
        .json({ success: true, message: "Already following" });
    }
    next(err);
  }

  // Event Publish (Checked Successfull)

  new UserFollowedPublisher(natsClient.client).publish(followers);

  res.status(201).json(followers);
});

// A User unfollowing a followed user (Checked Succesfull)
router.post("/unfollow/:target_user_id", auth, async (req, res) => {
  const { error } = validate({
    target_user_id: req.params.target_user_id,
  });

  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  const deletedFollow = await Follower.findOneAndDelete(
    {
      user_id: req.user._id,
      target_user_id: req.params.target_user_id,
    }
    // { new: true } this method exists only for
    // findByIdAndUpdate/findOneAndUpdate
    // /findOneAndReplace/findByIdAndReplace
  );

  if (!deletedFollow) {
    return res.status(404).send({ success: false, message: "User not found" });
  }

  // Event Publish (Checked Successfull)

  new UserUnfollowedPublisher(natsClient.client).publish({
    user_id: req.user._id,
    target_user_id: req.params.target_user_id,
  });

  res.status(200).json(deletedFollow);
});

export default router;

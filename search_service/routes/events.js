import express from "express";
const router = express.Router();
import User, { userEventsValidate } from "../models/user.js";
import Follower, { followerValidate } from "../models/follower.js";

// Listening to Events
router.post("/api/search/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "userRegistered") {
    console.log(data);

    // Validate the incoming user data
    const { error } = userEventsValidate(data);
    if (error) {
      console.log(error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    // Create the user -> After validation straightly going to database.
    const user = new User(data);
    await user.save();

    return res.status(201).json({});
  }

  if (type === "createdFollowing") {
    // validate incoming follower data
    const { error } = await followerValidate(data);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // After validation straightly going to database.
    const follower = new Follower(data);
    await follower.save();

    return res.status(201).json({});
  }

  if (type === "createdUnfollowing") {
    // validate incoming follower data
    const { error } = await followerValidate(data);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // After validation straightly going to database.
    const follower = new Follower(data);
    await follower.save();

    return res.status(201).json({});
  }

  // This facility not implemented inside the user service.
  if (type === "userUpdated") {
  }

  // This serivice not subscribe to this events
  if (type === "postCreated") {
  }

  if (type === "postUpdated") {
  }

  if (type === "postDeleted") {
  }

  // For all other events
  res.status(200).json({ message: "Event ignored" });
});

export default router;

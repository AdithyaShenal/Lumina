import express from "express";
const router = express.Router();
import Timeline from "../models/timeline.js";

// Get timeline of a user
router.get("/:id", async (req, res) => {
  // No need validations just grab the user ID from jwt query the timeline and send

  try {
    const followedPosts = await Timeline.findOne({ user_id: req.params.id });

    if (!followedPosts)
      return res
        .status(200)
        .json({ success: true, message: "No users followed yet" });

    res.status(200).send(followedPosts.posts);
  } catch (err) {
    console.log("Error fetching timeline: ", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching timeline",
    });
  }
});

export default router;

// -----------------------------------------------------------------------------------------------

// const followedPosts = await Post.find({ user_id: { $in: followedUserIds } });
// const trendingPosts = await Post.find({}).sort({ likes: -1 }).limit(10);
// const combined = [...followedPosts, ...trendingPosts].sort(
//   (a, b) => b.createdAt - a.createdAt
// );

// let posts;

// if (followedUserIds.length > 0) {
//   // Normal timeline
//   posts = await Post.find({ user_id: { $in: followedUserIds } })
//     .sort({ createdAt: -1 })
//     .limit(20);
// } else {
//   // Interest-based fallback
//   const user = await User.findById(userId);
//   posts = await Post.find({
//     tags: { $in: user.interests },
//   })
//     .sort({ createdAt: -1 })
//     .limit(20);
// }

// const recommended = await Post.find({ tags: { $in: user.interests } })
//   .sort({ createdAt: -1 })
//   .limit(10);

// const followedPosts = await Post.find({ user_id: { $in: followedUserIds } })
//   .sort({ createdAt: -1 })
//   .limit(20);

// const timeline = [...followedPosts, ...recommended].sort(
//   (a, b) => b.createdAt - a.createdAt
// );

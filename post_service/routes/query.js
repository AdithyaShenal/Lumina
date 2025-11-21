import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import prisma from "../startup/dbClient.js";

// Get all posts of a loggerd in user. (Current User)
router.get("/user/posts/all", auth, async (req, res) => {
  const user_id = req.user._id;

  try {
    const posts = await prisma.posts.findMany({
      where: {
        user_id: user_id,
      },
      orderBy: {
        time_stamp: "desc",
      },
    });

    console.log(posts);

    // I handled empty posts[] from frontend
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching user posts:", err);
    return res.status(500).json({
      message: "An internal server error occurred while fetching posts.",
    });
  }
});

router.get("/user/posts/:user_id", auth, async (req, res) => {
  const user_id = req.params.user_id;

  try {
    // // Optional but recommended
    // const user = await prisma.users.findUnique({
    //   where: { user_id },
    // });

    // if (!user) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "User not found." });
    // }

    const posts = await prisma.posts.findMany({
      where: { user_id },
      orderBy: { time_stamp: "desc" },
    });

    return res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching user posts:", err);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while fetching posts.",
    });
  }
});

// Get a post by post_id
router.get("/user/:post_id", auth, async (req, res) => {
  const post_id = req.params.post_id;
  if (!post_id)
    return res
      .status(400)
      .json({ success: false, message: "No post id received" });

  console.log(post_id);

  try {
    const post = await prisma.posts.findFirst({
      where: {
        post_id: post_id,
      },
    });

    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    res.status(200).json(post);
  } catch (err) {
    console.error("Error fetching user posts:", err);
    return res.status(500).json({
      message: "An internal server error occurred while fetching posts.",
    });
  }
});

// Get all posts of the database (Testing Purpose)
router.get("/posts/all", auth, async (req, res) => {
  try {
    const posts = await prisma.posts.findMany();

    // I handled empty posts[] from frontend
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching user posts:", err);
    return res.status(500).json({
      message: "An internal server error occurred while fetching posts.",
    });
  }
});

export default router;

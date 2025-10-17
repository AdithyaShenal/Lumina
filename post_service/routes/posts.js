import express from "express";
const router = express.Router();
import { BlobServiceClient } from "@azure/storage-blob";
import { v7 as uuidv7 } from "uuid";
import prisma from "../startup/dbClient.js";
import validate from "../validation/post.js";
import multer from "multer";

// const blobService =

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a Post
router.post("/", upload.none(), async (req, res) => {
  console.log(req.body);

  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const post = await prisma.posts.create({
    data: {
      post_id: uuidv7(),
      user_id: req.body.user_id,
      image_url: "http://ahdodpiodpioahdpoid-hard-coded/com",
      time_stamp: new Date(),
      caption: req.body.caption,
      location: req.body.location,
      post_type: req.body.post_type,
    },
  });

  res.send(post);
});

// async function findPost() {
//   const post = await prisma.posts.findFirst({
//     where: {
//       user_id: "ABCD123",
//     },
//   });

//   console.log(post);
// }

export default router;

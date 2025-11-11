import express from "express";
const router = express.Router();
import { BlobServiceClient } from "@azure/storage-blob";
import config from "config";
import { v7 as uuidv7 } from "uuid";
import crypto from "crypto";
import prisma from "../startup/dbClient.js";
import { natsClient } from "../events/nats-client.js";
import validate, {
  deletePostValidation,
  updatePostValidation,
} from "../validation/post.js";
import multer from "multer";
import auth from "../middleware/auth.js";
import PostDeletedPublisher from "../events/publishers/post-deleted-publisher.js";
import PostCreatedPublisher from "../events/publishers/post-created-publisher.js";

const blobService = BlobServiceClient.fromConnectionString(
  config.get("AZURE_STORAGE_CONNECTION_STRING")
);

const containerClient = blobService.getContainerClient("lumina-blob");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a Post
router.post("/", auth, upload.single("post_image"), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const file = req.file;
  if (!file) return res.status(400).json({ message: "No post image found" });

  try {
    const blobName =
      Date.now() +
      "-" +
      req.file.originalname +
      "-" +
      crypto.randomBytes(5).toString("hex");

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(req.file.buffer, req.file.size, {
      blobHTTPHeaders: { blobContentType: req.file.mimetype },
    });

    req.body["image_url"] = blockBlobClient.url;
    req.body["image_name"] = blobName;

    console.log(blockBlobClient.url); // Debug
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }

  const post = await prisma.posts.create({
    data: {
      post_id: uuidv7(),
      user_id: req.user._id,
      image_url: req.body.image_url,
      image_name: req.body.image_name,
      time_stamp: new Date(),
      caption: req.body.caption,
      location: req.body.location,
      post_type: req.body.post_type,
    },
  });

  // Event Publish

  new PostCreatedPublisher(natsClient.client).publish(post);

  res.status(201).json(post);
});

// Update a Post (Only text data updating allowed otherwise delete whole post)
router.put("/", auth, async (req, res) => {
  const { error } = updatePostValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const updatedPost = await prisma.posts.update({
      where: { post_id: req.body.post_id },
      data: {
        caption: req.body.caption,
        post_type: req.body.post_type,
        location: req.body.location,
      },
    });

    // Debug
    console.log("Updated Post: ", updatedPost);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: "Post with given ID not found." });
  }
});

// Delete Post Request
router.delete("/", auth, async (req, res) => {
  const { error } = deletePostValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  let post = await prisma.posts.findFirst({
    where: { post_id: req.body.post_id },
  });
  if (!post)
    return res.status(404).json({ message: "Post with given ID not found." });

  const blockBlobClient = containerClient.getBlockBlobClient(post.image_name);
  const deleteResponse = await blockBlobClient.deleteIfExists();

  console.log("Delete Post Image: ", deleteResponse.succeeded);

  if (!deleteResponse.succeeded)
    return res
      .status(404)
      .json({ message: "Image not found or already deleted." });

  post = await prisma.posts.delete({
    where: {
      post_id: req.body.post_id,
    },
  });

  if (!post)
    return res.status(404).json({ error: "Post with given ID not found." });

  console.log(`Post Deleted: ${post}`);

  // Event Publish

  new PostDeletedPublisher(natsClient.client).publish({
    post_id: req.body.post_id,
  });

  res.status(200).json(post);
});

export default router;

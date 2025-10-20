import express from "express";
const router = express.Router();
import { BlobServiceClient } from "@azure/storage-blob";
import config from "config";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User, { validate } from "../models/user.js";
import auth from "../middleware/auth.js";
import multer from "multer";
import _ from "lodash";
import axios from "axios";

const blobService = BlobServiceClient.fromConnectionString(
  config.get("AZURE_STORAGE_CONNECTION_STRING")
);
const containerClient = blobService.getContainerClient("lumina-blob");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// me
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -isAdmin");
  if (!user) return res.status(404).json({ message: "Invalid user." });
  res.json(user);
});

// User Registration
router.post("/", upload.single("profile_image"), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ error: "User already exists." });

  const file = req.file;
  console.log(file);
  console.log(req.body);

  if (req.file) {
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

    req.body["profile_image"] = {
      url: blockBlobClient.url,
      blob_name: blobName,
    };
    console.log(blockBlobClient.url);
  }

  // -----------------event-------------------------------------

  const message = {
    type: "userRegistered",
    data: req.body,
  };

  axios
    .post("http://localhost:3005/api/events", message)
    .catch((error) => console.log(error));

  // -----------------------------------------------------------

  user = new User(
    _.pick(req.body, [
      "username",
      "first_name",
      "last_name",
      "email",
      "password",
      "profile_image",
      "phone_number",
      "age",
      "location",
      "interests",
    ])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();

  const token = jwt.sign(
    { _id: user.id, isAdmin: user.isAdmin },
    config.get("jwtPrivateKey")
  );

  res
    .header("Auth-token", token)
    .json(_.pick(user, ["_id", "username", "email", "profile_image.url"]));
});

// User Update
// router.put("/", upload.single("profile_image"), async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).json({ error: error.details[0].message });

//   let user = await User.findOne({ email: req.body.email });
//   if (user) return res.status(400).json({ error: "User already exists." });

//   const file = req.file;
//   console.log(file);
//   console.log(req.body);

//   if (req.file) {
//     const blobName = Date.now() + "-" + req.file.originalname;
//     const blockBlobClient = containerClient.getBlockBlobClient(blobName);

//     await blockBlobClient.upload(req.file.buffer, req.file.size, {
//       blobHTTPHeaders: { blobContentType: req.file.mimetype },
//     });

//     req.body["profile_image"] = blockBlobClient.url;
//     console.log(blockBlobClient.url);
//   }

//   user = new User(
//     _.pick(req.body, [
//       "username",
//       "first_name",
//       "last_name",
//       "email",
//       "password",
//       "profile_image",
//       "phone_number",
//       "age",
//       "location",
//       "interests",
//     ])
//   );

//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(req.body.password, salt);

//   await user.save();

//   const token = jwt.sign(
//     { _id: user.id, isAdmin: user.isAdmin },
//     config.get("jwtPrivateKey")
//   );

//   res
//     .header("Auth-token", token)
//     .json(_.pick(user, ["_id", "username", "email"]));
// });

export default router;

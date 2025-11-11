import express from "express";
const router = express.Router();
import {
  BlobServiceClient,
  ContainerSASPermissions,
} from "@azure/storage-blob";
import { natsClient } from "../events/nats-client.js";
import auth from "../middleware/auth.js";
import multer from "multer";
import User, { validate, updateValidate } from "../models/user.js";
import config from "config";
import jwt from "jsonwebtoken";
import UserRegisteredPublisher from "../events/publishers/user-created-publisher.js";
import UserUpdatedPublisher from "../events/publishers/user-updated-publisher.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import _ from "lodash";
import UserDeletedPublisher from "../events/publishers/user-deleted-publisher.js";

const blobService = BlobServiceClient.fromConnectionString(
  config.get("AZURE_STORAGE_CONNECTION_STRING")
);
const containerClient = blobService.getContainerClient("lumina-blob");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// me (Checked - Successfull)
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -isAdmin");
  if (!user)
    return res.status(404).json({ success: false, message: "Invalid user" });
  res.json(user);
});

// User Registration
router.post("/", upload.single("profile_image"), async (req, res) => {
  if (req.body.interests && typeof req.body.interests === "string") {
    req.body.interests = JSON.parse(req.body.interests);
  }

  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  // username also should be checked*
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .json({ success: false, message: "User already exists." });

  const file = req.file;
  if (file) {
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
  }

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
    ]),
    {}
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();

  // Event (Checked - Successfull)

  new UserRegisteredPublisher(natsClient.client).publish(
    _.omit(user.toObject(), ["isAdmin", "password"])
  );

  const token = jwt.sign(
    { _id: user.id, isAdmin: user.isAdmin },
    config.get("jwtPrivateKey")
  );

  res
    .header("Auth-token", token)
    .json(_.pick(user, ["_id", "username", "email", "profile_image.url"]));
});

// User Update (Checked Successfull)
router.put("/", upload.single("profile_image"), auth, async (req, res) => {
  if (req.body.interests && typeof req.body.interests === "string") {
    req.body.interests = JSON.parse(req.body.interests);
  }

  // Profile image change should be move to separate route handler
  const { error } = updateValidate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const file = req.file;
  console.log(file); // Just for debug
  console.log(req.body); // Just for debug

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

  const allowedFields = [
    "first_name",
    "last_name",
    "profile_image",
    "phone_number",
    "age",
    "location",
    "interests",
  ];
  const updates = _.pick(req.body, allowedFields);

  Object.keys(updates).forEach(
    (key) =>
      (updates[key] === null ||
        updates[key] === undefined ||
        updates[key] === "") &&
      delete updates[key]
  );

  let user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: updates,
    },
    { new: true }
  ).select("-password -isAdmin");

  if (!user) return res.status(404).json({ error: "User not found" });

  // Event (Search service receives full user object) (Checked - Successfull)
  new UserUpdatedPublisher(natsClient.client).publish(user.toObject());

  res.status(200).send(user);
});

// User Delete (Delete account by user) (Checked - Successfull)
router.delete("/", auth, async (req, res) => {
  //Here profile picture should be deleted.

  const user = await User.findByIdAndDelete(req.user._id);

  if (!user) return res.status(400).send({ error: "User not found" });

  // Event Publish - UserDeletedEvent - (Successfull)
  new UserDeletedPublisher(natsClient.client).publish({ _id: req.user._id });

  const responseUser = _.omit(user.toObject(), ["password", "isAdmin"]);

  res.status(200).send(responseUser);
});

// Route handler change the profile picture

export default router;

import express from "express";
const app = express();
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { v7 as uuidv7 } from "uuid";

const prisma = new PrismaClient();

async function addPost() {
  const post = await prisma.posts.create({
    data: {
      post_id: uuidv7(),
      user_id: "ABCD123",
      post_url: "http://ahdodpiodpioahdpoid/com",
      time_stamp: new Date(),
      caption: "New World",
      location: "Polis",
      post_type: "Images",
    },
  });

  console.log(post);
}

addPost();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening to ${port}`);
});

import express from "express";
const app = express();
import posts from "./routes/posts.js";
import { natsClient } from "./events/nats-client.js";

await natsClient.connect("lumina", "postService", "http://localhost:4222");

app.use(express.json());
app.use("/api/posts", posts);

const port = process.env.PORT || 4002;
app.listen(4002, () => {
  console.log(`Listening to ${port}`);
});

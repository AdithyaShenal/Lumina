import express from "express";
const app = express();
import mongoose from "mongoose";
import { natsClient } from "./events/nats-client.js";
import timeline from "./routes/timeline.js";
import posts from "./routes/posts.js";
import { PostCreatedListener } from "./events/listeners/post-created-listener.js";
import { PostDeletedListener } from "./events/listeners/post-deleted-listener.js";
import { UserFollowedListener } from "./events/listeners/user-followed-listener.js";
import { UserUnfollowedListener } from "./events/listeners/user-unfollowed-listener.js";

await natsClient.connect("lumina", "timelineService", "http://localhost:4222");

// Listeners

new PostCreatedListener(natsClient.client).listen();
new PostDeletedListener(natsClient.client).listen();
new UserFollowedListener(natsClient.client).listen();
new UserUnfollowedListener(natsClient.client).listen();

mongoose
  .connect("mongodb://localhost:27017/lumina_TimelineServiceDB")
  .then(() => console.log(`Successfully Connected to MongoBD`))
  .catch((err) => console.log(err.message));

// Middlwares
app.use(express.json());
app.use("/api/timeline/", timeline);
app.use("/api/posts/", posts);

const port = process.env.PORT || 4004;
app.listen(4004, () => console.log(`Listening to Port: 4004`));

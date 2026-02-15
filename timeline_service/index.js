// import express from "express";
// const app = express();
// import mongoose from "mongoose";
// import cors from "cors";
// import { natsClient } from "./events/nats-client.js";
// import timeline from "./routes/timeline.js";
// import { PostCreatedListener } from "./events/listeners/post-created-listener.js";
// import { PostDeletedListener } from "./events/listeners/post-deleted-listener.js";
// import { UserFollowedListener } from "./events/listeners/user-followed-listener.js";
// import { UserUnfollowedListener } from "./events/listeners/user-unfollowed-listener.js";
// import morgan from "morgan";
// import helmet from "helmet";

// await natsClient.connect("lumina", "timelineService", "http://localhost:4222");

// // Listeners
// new PostCreatedListener(natsClient.client).listen();
// new PostDeletedListener(natsClient.client).listen();
// new UserFollowedListener(natsClient.client).listen();
// new UserUnfollowedListener(natsClient.client).listen();

// mongoose
//   .connect("mongodb://localhost:27017/lumina_TimelineServiceDB")
//   .then(() => console.log(`Successfully Connected to MongoBD`))
//   .catch((err) => console.log(err.message));

// // Middlwares
// app.use(
//   cors({
//     origin: "http://localhost:5173", // your frontend URL
//     credentials: true,
//   })
// );
// app.use(helmet());
// app.use(morgan("tiny"));
// app.use(express.json());
// app.use("/api/timeline/", timeline);

// const port = process.env.PORT || 4004;
// app.listen(4004, () => console.log(`Listening to Port: 4004`));

import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import { natsClient } from "./events/nats-client.js";
import timeline from "./routes/timeline.js";
import { PostCreatedListener } from "./events/listeners/post-created-listener.js";
import { PostDeletedListener } from "./events/listeners/post-deleted-listener.js";
import { UserFollowedListener } from "./events/listeners/user-followed-listener.js";
import { UserUnfollowedListener } from "./events/listeners/user-unfollowed-listener.js";
import morgan from "morgan";
import helmet from "helmet";

// Environment variables
const NATS_URL = process.env.NATS_URL || "http://localhost:4222";
const NATS_CLUSTER_ID = process.env.NATS_CLUSTER_ID || "lumina";
const NATS_CLIENT_ID = process.env.NATS_CLIENT_ID || "timelineService";
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/lumina_TimelineServiceDB";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const PORT = process.env.PORT || 4004;

// Connect to NATS
await natsClient.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL);

// Listeners
new PostCreatedListener(natsClient.client).listen();
new PostDeletedListener(natsClient.client).listen();
new UserFollowedListener(natsClient.client).listen();
new UserUnfollowedListener(natsClient.client).listen();

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() =>
    console.log(`Timeline Service: Successfully Connected to MongoDB`),
  )
  .catch((err) =>
    console.log(`Timeline Service MongoDB Error: ${err.message}`),
  );

// Middlewares
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/timeline", timeline);

app.listen(PORT, () => {
  console.log(`Timeline Service listening on Port: ${PORT}`);
});

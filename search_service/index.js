// import express from "express";
// const app = express();
// import mongoose from "mongoose";
// import { natsClient } from "./events/nats-client.js";
// import cors from "cors";
// import { UserRegisteredListener } from "./events/listeners/user-registered-listener.js";
// import { UserUpdatedListener } from "./events/listeners/user-updated-listener.js";
// import { UserDeletedListener } from "./events/listeners/user-deleted-listener.js";
// import { UserFollowedListener } from "./events/listeners/user-followed-listener.js";
// import { UserUnfollowedListener } from "./events/listeners/user-unfollowed-listener.js";
// import search from "./routes/search.js";
// import followers from "./routes/followers.js";
// import error from "./middleware/error.js";
// import morgan from "morgan";
// import cookieParser from "cookie-parser";

// await natsClient.connect("lumina", "searchService", "http://localhost:4222");

// // Event Listeners
// new UserRegisteredListener(natsClient.client).listen();
// new UserUpdatedListener(natsClient.client).listen();
// new UserDeletedListener(natsClient.client).listen();
// new UserFollowedListener(natsClient.client).listen();
// new UserUnfollowedListener(natsClient.client).listen();

// mongoose
//   .connect("mongodb://localhost:27017/lumina_SearchServiceDB")
//   .then(() => console.log(`Successfully Connected to MongoBD`))
//   .catch((err) => console.log(err.message));

// // Middlwares
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use(morgan("tiny"));
// app.use(express.json());
// app.use("/api/search", search);
// app.use("/api/followers", followers);
// app.use(error);

// const port = process.env.PORT || 4001;
// app.listen(4001, () => console.log(`Listening to Port: ${port}`));

import express from "express";
const app = express();
import mongoose from "mongoose";
import { natsClient } from "./events/nats-client.js";
import cors from "cors";
import { UserRegisteredListener } from "./events/listeners/user-registered-listener.js";
import { UserUpdatedListener } from "./events/listeners/user-updated-listener.js";
import { UserDeletedListener } from "./events/listeners/user-deleted-listener.js";
import { UserFollowedListener } from "./events/listeners/user-followed-listener.js";
import { UserUnfollowedListener } from "./events/listeners/user-unfollowed-listener.js";
import search from "./routes/search.js";
import followers from "./routes/followers.js";
import error from "./middleware/error.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Environment variables
const NATS_URL = process.env.NATS_URL || "http://localhost:4222";
const NATS_CLUSTER_ID = process.env.NATS_CLUSTER_ID || "lumina";
const NATS_CLIENT_ID = process.env.NATS_CLIENT_ID || "searchService";
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/lumina_SearchServiceDB";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const PORT = process.env.PORT || 4001;

// Connect to NATS
await natsClient.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL);

// Event Listeners
new UserRegisteredListener(natsClient.client).listen();
new UserUpdatedListener(natsClient.client).listen();
new UserDeletedListener(natsClient.client).listen();
new UserFollowedListener(natsClient.client).listen();
new UserUnfollowedListener(natsClient.client).listen();

// mongodb+srv://washenal55:washenal_admin@mycluster.ja90lnb.mongodb.net/zephyr_db?retryWrites=true&w=majority

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`Search Service: Successfully Connected to MongoDB`))
  .catch((err) => console.log(`Search Service MongoDB Error: ${err.message}`));

// Middlewares
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/search", search);
app.use("/api/followers", followers);
app.use(error);

app.listen(PORT, () => {
  console.log(`Search Service listening on Port: ${PORT}`);
});

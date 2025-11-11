import express from "express";
const app = express();
import mongoose from "mongoose";
import { natsClient } from "./events/nats-client.js";
import { UserRegisteredListener } from "./events/listeners/user-registered-listener.js";
import { UserUpdatedListener } from "./events/listeners/user-updated-listener.js";
import { UserDeletedListener } from "./events/listeners/user-deleted-listener.js";
import { UserFollowedListener } from "./events/listeners/user-followed-listener.js";
import { UserUnfollowedListener } from "./events/listeners/user-unfollowed-listener.js";
import search from "./routes/search.js";
import error from "./middleware/error.js";

await natsClient.connect("lumina", "searchService", "http://localhost:4222");

// Event Listeners
new UserRegisteredListener(natsClient.client).listen();
new UserUpdatedListener(natsClient.client).listen();
new UserDeletedListener(natsClient.client).listen();
new UserFollowedListener(natsClient.client).listen();
new UserUnfollowedListener(natsClient.client).listen();

mongoose
  .connect("mongodb://localhost:27017/lumina_SearchServiceDB")
  .then(() => console.log(`Successfully Connected to MongoBD`))
  .catch((err) => console.log(err.message));

// Middlwares
app.use(express.json());
app.use("/api/search/", search);
app.use(error);

const port = process.env.PORT || 4000;
app.listen(4001, () => console.log(`Listening to Port: ${port}`));

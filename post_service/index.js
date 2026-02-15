// import express from "express";
// const app = express();
// import cors from "cors";
// import posts from "./routes/posts.js";
// import queries from "./routes/query.js";
// import { natsClient } from "./events/nats-client.js";
// import morgan from "morgan";
// import cookieParser from "cookie-parser";

// await natsClient.connect("lumina", "postService", "http://localhost:4222");

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use(morgan("short"));
// app.use(express.json());
// app.use("/api/posts", posts);
// app.use("/api/queries", queries);

// const port = process.env.PORT || 4002;
// app.listen(4002, () => {
//   console.log(`Listening to ${port}`);
// });

import express from "express";
const app = express();
import cors from "cors";
import posts from "./routes/posts.js";
import queries from "./routes/query.js";
import { natsClient } from "./events/nats-client.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Environment variables
const NATS_URL = process.env.NATS_URL || "http://localhost:4222";
const NATS_CLUSTER_ID = process.env.NATS_CLUSTER_ID || "lumina";
const NATS_CLIENT_ID = process.env.NATS_CLIENT_ID || "postService";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const PORT = process.env.PORT || 4002;

// Connect to NATS
await natsClient.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL);

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(morgan("short"));
app.use(express.json());
app.use("/api/posts", posts);
app.use("/api/queries", queries);

app.listen(PORT, () => {
  console.log(`Post Service listening on Port: ${PORT}`);
});

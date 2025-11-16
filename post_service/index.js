import express from "express";
const app = express();
import cors from "cors";
import posts from "./routes/posts.js";
import queries from "./routes/query.js";
import { natsClient } from "./events/nats-client.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

await natsClient.connect("lumina", "postService", "http://localhost:4222");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("short"));
app.use(express.json());
app.use("/api/posts", posts);
app.use("/api/queries", queries);

const port = process.env.PORT || 4002;
app.listen(4002, () => {
  console.log(`Listening to ${port}`);
});

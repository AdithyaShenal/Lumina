import express from "express";
const app = express();
import { natsClient } from "./events/nats-client.js";
import users from "./routes/users.js";
import login from "./routes/login.js";
import logout from "./routes/logout.js";
import followers from "./routes/followers.js";
import db from "./startup/db.js";
import helmet from "helmet";
import error from "./middleware/error.js";
import { infoLogger } from "./startup/logger.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// Environment variables
const NATS_URL = process.env.NATS_URL || "http://localhost:4222";
const NATS_CLUSTER_ID = process.env.NATS_CLUSTER_ID || "lumina";
const NATS_CLIENT_ID = process.env.NATS_CLIENT_ID || "userService";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const PORT = process.env.PORT || 4000;

// Connect to NATS
await natsClient.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL);

// Startup Modules
db();

app.use(morgan("tiny"));
app.use(helmet());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/login", login);
app.use("/api/users", users);
app.use("/api/logout", logout);
app.use("/api/followers", followers);
app.use(error);

app.listen(PORT, () => {
  infoLogger.info(`User Service listening on Port: ${PORT}`);
  console.log(`User Service listening on Port: ${PORT}`);
});

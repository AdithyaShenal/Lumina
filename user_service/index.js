// import logger_module, { logger } from "./startup/logger.js";
import express from "express";
const app = express();
import { natsClient } from "./events/nats-client.js";
import users from "./routes/users.js";
import login from "./routes/login.js";
import folllowers from "./routes/followers.js";
import db from "./startup/db.js";
import config from "config";
import helmet from "helmet";
import error from "./middleware/error.js";
import { infoLogger } from "./startup/logger.js";
import morgan from "morgan";

await natsClient.connect("lumina", "userService", "http://localhost:4222");

// Startup Modules
// logger_module();
db();

app.use(morgan("tiny"));
app.use(helmet());
app.use(express.json());
app.use("/api/users", users);
app.use("/api/login", login);
app.use("/api/followers", folllowers);
app.use(error);

const port = process.env.PORT || config.get("PORT");
app.listen(4000, () => {
  infoLogger.info(`Listening to Port: ${port}`);
});

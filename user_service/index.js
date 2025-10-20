import logger_module, { logger } from "./startup/logger.js";
import express from "express";
const app = express();
import users from "./routes/users.js";
import login from "./routes/login.js";
import folllowers from "./routes/followers.js";
import db from "./startup/db.js";
import config from "config";
import helmet from "helmet";
import error from "./middleware/error.js";

// Startup Modules
logger_module();
db();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use("/api/users", users);
app.use("/api/login", login);
app.use("/api/followers", folllowers);
app.use(error);

const port = process.env.PORT || config.get("PORT");
app.listen(port, () => {
  logger.info(`Listening to Port: ${port}`);
});

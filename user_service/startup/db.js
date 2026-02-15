import mongoose from "mongoose";
import { infoLogger, errorLogger } from "../startup/logger.js";

export default function () {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => infoLogger.info("Successfully Connected to MonogoDB."))
    .catch((err) => errorLogger.error(err));
}

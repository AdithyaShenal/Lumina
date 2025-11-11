import mongoose from "mongoose";
import { infoLogger, errorLogger } from "../startup/logger.js";

export default function () {
  mongoose
    .connect("mongodb://localhost:27017/lumina_UserServiceDB")
    .then(() => infoLogger.info("Successfully Connected to MonogoDB."))
    .catch((err) => errorLogger.error(err));
}

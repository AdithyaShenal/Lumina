import { logger } from "../startup/logger.js";

export default function (err, req, res, next) {
  res.status(500).json({ message: "Something Failed" });
  console.log("Flag", err);
}

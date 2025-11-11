import logger from "../logger.js";

export default function (err, req, res, next) {
  logger.error(err.message);
  return res.status(500).json({ message: "Something Failed" });
}

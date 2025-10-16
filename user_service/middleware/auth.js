import config from "config";
import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const token = req.header("Auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decode;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
}

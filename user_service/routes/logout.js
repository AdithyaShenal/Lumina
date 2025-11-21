import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/", // ensure cookie is cleared across all routes
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export default router;

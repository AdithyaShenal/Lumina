import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

// Get all the followers of a user
router.get("/", auth, async (req, res) => {});

// Get all the following users of a user
router.get("/:name", auth, async (req, res) => {});

export default router;

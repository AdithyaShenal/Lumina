import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

// Get a User details by user ID
router.get("/", auth, async (req, res) => {});

// Search a User by Name -> Response: List of matching users
router.get("/:name", auth, async (req, res) => {});

// Get all users available
router.get("/all", auth, async (req, res) => {});

export default router;

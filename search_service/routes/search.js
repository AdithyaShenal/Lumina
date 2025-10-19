import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

// Get a User details by user ID
router.get("/api/search/:id", auth, async (req, res) => {});

// Search a User by Name -> Response: List of matching users
router.get("/api/search/:name", auth, async (req, res) => {});

//

export default router;

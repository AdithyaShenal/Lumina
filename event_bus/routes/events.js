import express from "express";
const router = express.Router();
import Events, { validation } from "../model/events.js";
import axios from "axios";

router.post("/", async (req, res) => {
  const { error } = await validation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Debug
  console.log(req.body);

  // Enter to Event-Queue
  const event = new Events(req.body);
  await event.save();

  // Emitting to Search and Timeline Services
  axios
    .post("http://localhost:3002/api/search/events", event)
    .catch((error) =>
      console.log("Error (Route still bot configured):", error.message)
    );

  axios
    .post("http://localhost:3003/api/timeline/events", event)
    .catch((error) =>
      console.log("Error (Route still bot configured):", error.message)
    );

  res.status(201).json({ message: "Event Recieved." });
});

router.get("/", (req, res) => {});

export default router;

import express from "express";
const app = express();
import mongoose from "mongoose";
import events from "./routes/events.js";
import error from "./middleware/error.js";

mongoose
  .connect("mongodb://localhost:27017/lumina_EventServiceDB")
  .then(() => console.log("Successfully Connected to mongoDB."))
  .catch((error) => console.log(error.message));

// Middleware

app.use(express.json());
app.use("/api/events", events);
app.use(error);

const port = process.env.PORT || 3004;
app.listen(port, () => console.log(`Listening to ${port}`));

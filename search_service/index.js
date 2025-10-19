import express from "express";
const app = express();
import mongoose from "mongoose";
import events from "./routes/events.js";
import search from "./routes/search.js";
import error from "./middleware/error.js";

mongoose
  .connect("mongodb://localhost:27017/lumina_SearchServiceDB")
  .then(() => console.log(`Successfully Connected to MongoBD`))
  .catch((err) => console.log(err.message));

// Middlwares
app.use(express.json());
app.use("/", events);
app.use("/", search);
app.use(error);

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening to Port: ${port}`));

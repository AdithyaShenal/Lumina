import express from "express";
const app = express();
import posts from "./routes/posts.js";

app.use(express.json());
app.use("/api/posts", posts);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening to ${port}`);
});

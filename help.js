const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

// Get all Posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

// Create a Post
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios
    .post("http://localhost:4005/events", {
      type: "postCreated",
      data: {
        id,
        title,
      },
    })
    .catch((err) => console.log(err.message));

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event Recieved: ", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});

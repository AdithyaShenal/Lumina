import express from "express";
const app = express();
import mysql from "mysql2";

app.use(express.json());

// Create a Post
app.post("/api/posts", (req, res) => {});

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "adithya123",
    database: "lumina_postservicedb",
  })
  .promise();

async function getPosts() {
  const [rows] = await pool.query("SELECT * FROM posts");
  console.log(rows);
}

getPosts();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening to ${port}`);
});

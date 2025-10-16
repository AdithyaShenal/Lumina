import mongoose from "mongoose";

export default function () {
  mongoose
    .connect("mongodb://localhost:27017/lumina_UserServiceDB")
    .then(() => console.log("Successfully Connected to MonogoDB."))
    .catch((err) => console.log(err));
}

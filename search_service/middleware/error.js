export default function (err, req, res, next) {
  console.log(err.message);
  return res.status(500).json({ message: "Something failed." });
}

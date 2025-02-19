const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => {
  for (let i = 0; i < 10000000000; i++) {}
  res.send("hello world");
});

// app.get("/stress-test", (req, res) => {
//   for (let i = 0; i < 10000000000; i++) {}
//   res.send("hello world");
// });

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

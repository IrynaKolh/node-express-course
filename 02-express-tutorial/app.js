const express = require("express");

const peopleRouter = require("./routes/people");
const app = express();

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  console.log(method, url);
  next();
};

app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Home");
});

app.use("/api/v1/people", peopleRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
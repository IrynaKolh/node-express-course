const express = require("express");
const cookieParser = require("cookie-parser");
const peopleRouter = require("./routes/people");

const app = express();

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  console.log(method, url);
  next();
};

const auth = (req, res, next) => {
  if (req.cookies.name) {
    req.user = req.cookies.name;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", logger);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Home");
});

app.use("/api/v1/people", peopleRouter);

// Optional Additional Assignment
app.post("/logon", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ message: "Name is required in the request body." });
  }
  res.cookie("name", name);
  res.status(201).json({ message: `Hello, ${name}!` });
});

app.delete("/logoff", (req, res) => {
  res.clearCookie("name");
  return res.status(200).json({ message: "The user is logged off" });
});

app.get("/test", auth, (req, res) => {
  res.status(200).json({ message: `Welcome to ${req.user}` });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
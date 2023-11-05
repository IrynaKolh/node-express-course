const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDb = require("./db/connect");
require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
require("express-async-errors");

const port = process.env.PORT ? process.env.PORT : 3000;

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);

app.use(errorHandler);

// Additional Assignment
// app.use((err, req, res, next) => {
//   if (err.message === "Not found") {
//     res.status(404);
//     res.json({ error: err.message });
//   } else {
//     res.status(500);
//     res.json({ error: "Something went wrong" });
//   }
//   next(err);
// });

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(port, console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

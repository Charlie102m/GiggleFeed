const path = require("path");
const express = require("express");
const app = express();
const colors = require("colors");
const { connectDb } = require("./config/db.js");

// DEVELOPMENT
if (process.env.NODE_ENV === "development") {
  const dotenv = require("dotenv").config({ path: __dirname + "/config/.env" });
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// CONFIG
app.use(express.json());
connectDb();

// ROUTERS
const AuthRouter = require("./routes/AuthRoutes.js");
const JokeRouter = require("./routes/JokeRoutes.js");
const VoteRouter = require("./routes/VoteRoutes.js");

app.use("/api/auth", AuthRouter);
app.use("/api/joke", JokeRouter);
app.use("/api/vote", VoteRouter);

// ERROR HANDLER
const errorHandler = require("./middleware/error.js");
app.use(errorHandler);

// SERVER
app.listen(process.env.PORT || 5000, () =>
  console.log(
    `SERVER RUNNING ON PORT : ${process.env.PORT || 5000}`.bold.yellow
  )
);

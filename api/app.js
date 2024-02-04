const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const newsRouter = require("./routes/newsRoutes.js");
const usersRouter = require("./routes/userRoutes.js");
const errorHandler = require(`${__dirname}/middleware/errorHandler.js`);

const app = express();

dotenv.config({ path: "./config.env" });

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "news", // specify the database name
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.error(err));

// Routes

app.use("/api/v1/news", newsRouter);
app.use("/api/v1/users", usersRouter);
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  const error = new Error(`Can't find ${req.originalUrl} on this server!`);
  error.status = "fail";
  err.statusCode = 404;

  next(error);
});
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`this express app listening on port ${port}!`)
);

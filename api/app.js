const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");

const newsRouter = require("./routes/newsRoutes.js");
const usersRouter = require("./routes/userRoutes.js");
const errorHandler = require(`${__dirname}/middleware/errorHandler.js`);

const app = express();

dotenv.config({ path: "./config.env" });

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
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

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`this express app listening on port ${port}!`)
);

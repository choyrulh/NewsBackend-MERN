const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");

const newsRouter = require("./routes/newsRoutes.js");

const app = express();

dotenv.config({ path: "./config.env" });

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`this express app listening on port ${port}!`)
);

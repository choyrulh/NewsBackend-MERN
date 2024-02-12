const express = require("express");
const cors = require("cors");

const newsRouter = require("./routes/newsRoutes.js");
const usersRouter = require("./routes/userRoutes.js");
const authRouter = require("./routes/authRoutes.js");
const errorHandler = require(`${__dirname}/middleware/errorHandler.js`);

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Global Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

app.use(cors());

// Routes

app.use("/api/v1/news", newsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/users", authRouter);

// Error Handling
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

module.exports = app;

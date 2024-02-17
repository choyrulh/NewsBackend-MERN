const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const newsRouter = require("./routes/newsRoutes.js");
const usersRouter = require("./routes/userRoutes.js");
const authRouter = require("./routes/authRoutes.js");
const errorHandler = require(`${__dirname}/middleware/errorHandler.js`);

const app = express();

// Global Middleware
// Set security HTTP headers
app.use(helmet());

// Dev logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit Request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour",
});
app.use("/api", limiter);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// app.use(hpp());

// Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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

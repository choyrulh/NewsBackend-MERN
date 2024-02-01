const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

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

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`this express app listening on port ${port}!`)
);

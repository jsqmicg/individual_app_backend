const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();

//config .env to ./config/config.env

require("dotenv").config({
  path: "./config/config.env",
});
//Connect to database
connectDB();
app.use(bodyParser.json());

//config only development
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
  app.use(morgan("dev"));
}

const authRouter = require("./routes/auth.route");

//Use Routes
app.use("/api/", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "connected" });
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page Not Founded",
  });
});

const PORT = process.env.PORT;
console.log(process.env.NODE_ENV);
console.log(PORT);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

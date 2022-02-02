// Importing Node modules and initializing Express
const express = require("express"),
  app = express(),
  logger = require("morgan"),
  router = require("./router"),
  mongoose = require("mongoose"),
  cors = require("cors");
require("dotenv/config");

// Database Setup
mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Setting up basic middleware for all Express requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev")); // Log requests to API using morgan

app.set("view engine", "ejs");

// Start the server
let server = app.listen(process.env.PORT);
console.log(`Your server is running on port ${process.env.PORT}.`);

// Import routes to be served
router(app);

// necessary for testing
module.exports = server;

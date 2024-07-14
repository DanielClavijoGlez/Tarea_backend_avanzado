"use strict";

const mongoose = require("mongoose");

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB", err);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB at", mongoose.connection.name);
});

mongoose.connect(process.env.MONGODB_CONNECT_STR);

module.exports = mongoose.connection;

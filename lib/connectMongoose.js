"use strict";

const mongoose = require("mongoose");

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB", err);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB at", mongoose.connection.name);
});

mongoose.connect("mongodb://127.0.0.1:27017/fundamentos_backend");

module.exports = mongoose.connection;

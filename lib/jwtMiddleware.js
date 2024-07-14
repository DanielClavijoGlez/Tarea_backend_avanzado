"use strict";

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.get("Authorization");

  if (!token) {
    const error = new Error("No token provided");
    error.status = 401;
    return next(error);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      err.status = 401;
      return next(err);
    }
  });

  next();
};

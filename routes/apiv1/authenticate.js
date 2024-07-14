"use strict";

const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const Usuario = require("../../models/Usuario");

router.post(
  "/",
  [
    body("email").isEmail().withMessage("'email' must be a valid email"),
    body("password").isAlphanumeric().withMessage("'password' must be a string"),
  ],
  asyncHandler(async (req, res, next) => {
    validationResult(req).throw();

    const user = await Usuario.findOne({ email: req.body.email });

    if (!user) 
      return res.json({ ok: false, status: 404, error: "There is no user with this email" });

    if (!await user.comparePasswords(req.body.password)) 
      return res.json({ ok: false, status: 401, error: "Invalid credentials" });
    

    jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    }, (error, token) => {
      if (error) return next(error);
      res.json({ ok: true, token: token });
    });
  })
);

module.exports = router;

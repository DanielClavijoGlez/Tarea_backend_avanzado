"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

usuarioSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

usuarioSchema.methods.comparePasswords = async function (password) {
  return this.password === await bcrypt.hash(password, 10);
}

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;

"use strict";

const multer = require("multer");
const path = require("node:path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const newPath = path.join(__dirname, "..", "public/images", "anuncios");
    cb(null, newPath);
  },
  filename: function (req, file, cb) {
    try {
      const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
      cb(null, filename);
    } catch (error) {
      cb(error);
    }
  },
});

module.exports = multer({ storage: storage });

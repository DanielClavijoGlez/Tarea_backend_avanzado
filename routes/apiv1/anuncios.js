"use strict";

const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { getFiltersByRequest } = require("../../lib/anunciosUtils");

const mongoose = require("mongoose");
const Anuncio = mongoose.model("Anuncio");

router.get(
  "/",
  asyncHandler(async function (req, res) {
    const filters = getFiltersByRequest(req);

    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 500;
    const sort = req.query.sort || "_id";

    const anuncios = await Anuncio.getAnunciosForApi(
      filters,
      skip,
      limit,
      sort
    );
    res.json({ results: anuncios });
  })
);

router.get("/tags", (req, res) => {
  const tags = Anuncio.getAvailableTags();
  res.json({ availableTags: tags });
});

router.post("/", [
  body('nombre').isAlphanumeric().withMessage("'nombre' must be a string"),
  body('venta').isBoolean().withMessage("'venta' must be a boolean value"),
  body('precio').isNumeric().withMessage("'precio' must be either an integer or a float number"),
  body('tags').custom(value => {
    let result = true;
    if (Array.isArray(value)) {
      value.forEach(val => {
        if (!Anuncio.getAvailableTags().includes(val)) result = false;
      })
    } else {
      if (!Anuncio.getAvailableTags().includes(value)) result = false;
    }
    return result;
  }).withMessage(`'tag' must be one or more of the following: ${Anuncio.getAvailableTags()}`)
], asyncHandler(async (req, res) => {

  validationResult(req).throw();

  const newAnuncio = await Anuncio.saveNewAnuncio(req.body);

  res.json({newAnuncio: newAnuncio});
}));

module.exports = router;

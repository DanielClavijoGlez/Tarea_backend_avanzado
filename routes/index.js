var express = require('express');
var router = express.Router();

const asyncHandler = require("express-async-handler");
const { getFiltersByRequest }  = require('../lib/anunciosUtils');

const mongoose = require("mongoose");
const Anuncio = mongoose.model("Anuncio");

/* GET home page. */
router.get('/', asyncHandler(async function(req, res, next) {
  const filters = getFiltersByRequest(req);

  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 500;
  const sort = req.query.sort || '_id';

  const anuncios = await Anuncio.getAnunciosForBrowser(filters, skip, limit, sort);

  res.render('index', { title: 'Fundamentos Backend', anuncios: anuncios });
}));

module.exports = router;

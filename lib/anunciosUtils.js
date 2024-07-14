'use strict'

exports.getFiltersByRequest = (req) => {
  const filters = {};

  if (req.query.tag) {
    filters.tags = { $all: req.query.tag };
  }
  if (req.query.venta === true || req.query.venta === false) {
    filters.venta = req.query.venta;
  }
  if (req.query.nombre) {
    filters.nombre = new RegExp("^" + req.query.nombre, "i");
  }
  if (req.query.precio) {
    if (req.query.precio.includes('-')) {
      filters.precio = {};
      filters.precio.$gt = parseFloat(req.query.precio.substring(0, req.query.precio.indexOf('-'))) || Number.NEGATIVE_INFINITY;
      filters.precio.$lt = parseFloat(req.query.precio.substring(req.query.precio.indexOf('-') + 1, req.query.precio.length)) || Number.POSITIVE_INFINITY;
    } else {
      filters.precio = parseFloat(req.query.precio) || null;
    }
  }
  return filters;
};

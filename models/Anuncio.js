"use strict";

const mongoose = require("mongoose");

const anuncioSchema = mongoose.Schema({
  nombre: { type: String, index: true},
  venta: { type: Boolean, index: true },
  precio: { type: Number, min: 0, index: true },
  foto: String,
  tags: {
    type: [String],
    enum: ["work", "lifestyle", "motor", "mobile"],
    index: true,
  },
});

anuncioSchema.statics.getAnunciosForApi = async function(filters, skip, limit, sort) {
  const query = Anuncio.find(filters, {__v: 0, foto: 0});
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  const anuncios = await query.exec();

  return anuncios;
};

anuncioSchema.statics.getAnunciosForBrowser = async function(filters, skip, limit, sort) {
  const query = Anuncio.find(filters, {__v: 0});
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  const anuncios = await query.exec();

  anuncios.forEach((anuncio) => {
    anuncio.foto = '/images/anuncios/' + anuncio.foto;
  });

  return anuncios;
};

anuncioSchema.statics.getAvailableTags = () => {
  return anuncioSchema.path('tags').caster.enumValues;
};

anuncioSchema.statics.saveNewAnuncio = async (anuncioData) => {
  const anuncio = new Anuncio(anuncioData);
  const newAnuncio = await anuncio.save();

  return newAnuncio;
}

const Anuncio = mongoose.model("Anuncio", anuncioSchema);

module.exports = Anuncio;

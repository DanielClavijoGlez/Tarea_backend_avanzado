"use strict";

const { Requester } = require("cote");
const mongoose = require("mongoose");

const fsPromises = require("fs").promises;

const requester = new Requester({ name: "Anuncio-requester" });

const anuncioSchema = mongoose.Schema({
  nombre: { type: String, index: true },
  venta: { type: Boolean, index: true },
  precio: { type: Number, min: 0, index: true },
  foto: String,
  tags: {
    type: [String],
    enum: ["work", "lifestyle", "motor", "mobile"],
    index: true,
  },
});

anuncioSchema.statics.getAnunciosForApi = async function (
  filters,
  skip,
  limit,
  sort
) {
  const query = Anuncio.find(filters, { __v: 0, foto: 0 });
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  const anuncios = await query.exec();

  return anuncios;
};

anuncioSchema.statics.getAnunciosForBrowser = async function (
  filters,
  skip,
  limit,
  sort
) {
  const query = Anuncio.find(filters, { __v: 0 });
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  const anuncios = await query.exec();

  anuncios.forEach((anuncio) => {
    anuncio.foto = process.env.ANUNCIO_IMG_URL_BASE_PATH + anuncio.foto;
  });

  return anuncios;
};

anuncioSchema.statics.getAvailableTags = () => {
  return anuncioSchema.path("tags").caster.enumValues;
};

anuncioSchema.statics.saveNewAnuncio = async (anuncioData) => {
  const anuncio = new Anuncio(anuncioData.body);
  const newAnuncio = await anuncio.save();

  if (anuncioData.file) anuncio.foto = anuncioData.file.filename;

  return newAnuncio;
};

anuncioSchema.statics.createThumbnail = async function (image) {
  requester.send(
    {
      type: "create-thumbnail",
      image: image,
    },
    (result) => {}
  );
};

const Anuncio = mongoose.model("Anuncio", anuncioSchema);

module.exports = Anuncio;

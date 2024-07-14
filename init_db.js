"use strict";

const connection = require("./lib/connectMongoose");
const readLine = require("node:readline");
const Anuncio = require("./models/Anuncio");

const anunciosJson = require("./anuncios.json").anuncios;

main().catch((err) => console.log("There was an error", err));

async function main() {
  await new Promise((resolve) => connection.once("open", resolve));

  const deletionPermission = await askUserDeletionPermission(
    "Do you really want to delete all content in the database? (no): "
  );
  if (!deletionPermission) {
    process.exit();
  }

  await initAnuncios();

  connection.close();
}

async function initAnuncios() {
  const deleted = await Anuncio.deleteMany();
  console.log(`Deleted ${deleted.deletedCount} 'anuncios'`);

  const inserted = await Anuncio.insertMany(anunciosJson);
  console.log(`Created ${inserted.length} 'anuncios'`);
}

function askUserDeletionPermission(question) {
  return new Promise((resolve, reject) => {
    const ifc = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    ifc.question(question, (response) => {
      ifc.close();
      resolve(
        response.toLowerCase() === "si" || response.toLowerCase() === "sí"
      );
    });
  });
}

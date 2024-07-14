"use strict";

const connection = require("./lib/connectMongoose");
const readLine = require("node:readline");
const Anuncio = require("./models/Anuncio");
const Usuario = require("./models/Usuario");

const anunciosJson = require("./init_db_data.json").anuncios;
const usuariosJson = require("./init_db_data.json").usuarios;

main().catch((err) => console.log("There was an error", err));

async function main() {
  await new Promise((resolve) => connection.once("open", resolve));
  const deletionPermission = await askUserDeletionPermission(
    "Do you really want to delete all content in the database? (no): "
  );
  if (!deletionPermission) {
    process.exit();
  }

  await initUsuarios();
  await initAnuncios();

  connection.close();
}

async function initUsuarios() {
  const deleted = await Usuario.deleteMany();
  console.log(`Deleted ${deleted.deletedCount} 'usuarios'`);

  for (const usuario of usuariosJson) {
    usuario.password = await Usuario.hashPassword(usuario.password);
  }

  const inserted = await Usuario.insertMany(usuariosJson);
  console.log(`Created ${inserted.length} 'usuarios'`);
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

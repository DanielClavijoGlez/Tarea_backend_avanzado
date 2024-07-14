const { Responder } = require("cote");
const jimp = require("jimp");

const responder = new Responder({ name: "thumbnail creator service" });

responder.on("create-thumbnail", async (req) => {
  const image = await jimp.read("../public/images/anuncios/" + req.image);

  return image.scaleToFit(100, 100).write("../public/images/anuncios/thumbnail" + req.image);
});

const path = require("node:path");
const i18n = require("i18n");

i18n.configure({
  locales: ["en", "es"],
  directory: path.join(__dirname, "..", "locales"),
  defaultLocale: "en",
  autoReload: true,
  syncFiles: true,
  queryParameter: "lang",
});

module.exports = i18n;

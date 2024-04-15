const { readFile, writeFile } = require("./src/io");
const {fetchDates} = require("./src/dates");
const { parseTitles } = require("./src/titles");
const { collectVolumes } = require("./src/volumes");

collectVolumes()
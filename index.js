const bodyParser = require("body-parser");
const express = require("express");
const router = require("./src/routes.js")
const pages = require("./lists/pageList.json");
const volumes = require("./lists/volumeList.json");
// const {fetchDates} = require("./src/dates");
// const { parseTitles } = require("./src/titles");
// const { collectVolumes } = require("./src/volumes");

const app = express();
app.use(bodyParser.json());

app.use("/", router)

app.listen(3123, () => {
  console.log("listening at port 3123");
});

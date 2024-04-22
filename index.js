const bodyParser = require("body-parser");
const express = require("express");
const router = require("./src/routes.js");
const cron = require("node-cron");

const { fetchDates } = require("./src/dates.js");
const { collectVolumes } = require("./src/volumes.js");

const app = express();
app.use(bodyParser.json());

cron.schedule("0 20 * * 1,3,5", () => {
  fetchDates();
});

cron.schedule("0 21 * * 1,3,5", () => {
  collectVolumes();
});

app.use("/", router);

app.listen(3123, () => {
  console.log("listening at port 3123");
});

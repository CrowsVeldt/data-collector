const bodyParser = require("body-parser");
const express = require("express");
const router = require("./src/routes.js");
const cron = require("node-cron");

const { fetchDates } = require("./src/dates.js");
const { collectVolumes } = require("./src/volumes.js");

const app = express();
app.use(bodyParser.json());

cron.schedule("0 9 * * 0-6", () => {
  fetchDates();
});

cron.schedule("30 9 * * 0-6", () => {
  collectVolumes();
});

app.use("/", router);

app.listen(3123, () => {
  console.log("listening at port 3123");
});

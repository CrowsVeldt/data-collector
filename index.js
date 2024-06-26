const bodyParser = require("body-parser");
const express = require("express");
const router = require("./src/routes.js");
const cron = require("node-cron");

const { fetchDates } = require("./src/dates.js");
const { collectVolumes } = require("./src/volumes.js");

const app = express();
app.use(bodyParser.json());

cron.schedule("20 9 * * 0-6", async () => {
  console.log("Checking for new pages")
  await fetchDates();
  console.log("Finished checking")
});

cron.schedule("40 9 * * 0-6", async () => {
  console.log("Collecting data into volumes and pages")
  await collectVolumes();
  console.log("Finished collecting data")
});

app.use("/", router);

app.listen(3123, () => {
  console.log("listening at port 3123");
});

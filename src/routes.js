const express = require("express");
const router = express.Router();
const FS = require("node:fs/promises");
const PATH = require("node:path");

const { fetchDates } = require("./dates");
const { collectVolumes } = require("./volumes");
const root = PATH.resolve("./");

router.get("/", async (req, res) => {
  const pageFile = await FS.readFile(`${root}/lists/pageList.json`, "utf-8");
  const volumeFile = await FS.readFile(
    `${root}/lists/volumeList.json`,
    "utf-8"
  );
  const pages = JSON.parse(pageFile);
  const volumes = JSON.parse(volumeFile);

  res.send({ pages, volumes });
});

router.get("/check", async (req, res) => {
  const { date } = req.query;
  const dateFile = await FS.readFile(`${root}/lists/dateList.json`, "utf-8");
  const dateList = JSON.parse(dateFile);

  const dateIndex = dateList.findIndex((item) => item === date);
  try {
    if (dateIndex !== -1 && dateIndex < dateList.length - 1) {
      res.send({ message: "Update ready", data: true });
    } else {
      res.send({ message: "Already up to date", data: false });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/update/dates", async (req, res) => {
  try {
    await fetchDates();
    const dateFile = await FS.readFile(`${root}/lists/dateList.json`, "utf-8");
    const dates = JSON.parse(dateFile);
    res.send(dates);
  } catch (error) {
    console.error("an error occured fetching dates");
  }
});

router.get("/update/volumes", async (req, res) => {
  try {
    await collectVolumes();
  } catch (error) {
    console.error("error collecting and/or sending page/volume data ");
  }
  const pageFile = await FS.readFile(`${root}/lists/pageList.json`, "utf-8");
  const volumeFile = await FS.readFile(
    `${root}/lists/volumeList.json`,
    "utf-8"
  );
  const pages = JSON.parse(pageFile);
  const volumes = JSON.parse(volumeFile);

  res.send({ pages, volumes });
});

module.exports = router;

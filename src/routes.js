const express = require("express");
const router = express.Router();

const dates = require("../lists/dateList.json");
const pages = require("../lists/pageList.json");
const volumes = require("../lists/volumeList.json");
const { fetchDates } = require("./dates");
const { collectVolumes } = require("./volumes");

router.get("/", (req, res) => {
  res.send({ pages, volumes });
});

router.get("/check", async (req, res) => {
  const { date } = req.query;
  const dateList = dates;
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
  res.send({ pages, volumes });
});

module.exports = router;

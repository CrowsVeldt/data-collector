const express = require("express");
const router = express.Router();

const dates = require("../lists/dateList.json");
const pages = require("../lists/pageList.json");
const volumes = require("../lists/volumeList.json");

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

module.exports = router;
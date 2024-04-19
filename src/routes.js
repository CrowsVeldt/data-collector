const express = require("express")
const router = express.Router()

const pages = require("../lists/pageList.json")
const volumes = require("../lists/volumeList.json")

router.get("/", (req, res) => {
  res.send({ pages, volumes });
});

router.get("/check", (req, res) => {
  const { date } = req.query;
  const pageList = pages;
  const pageIndex = pageList.findIndex((item) => item.date === date);
  if (pageIndex !== -1 && pageIndex < pageList.length - 1) {
    // const newDates = pageList.slice(pageIndex);
    // console.log("new dates: " + newDates.toString());
    res.send({ message: "New dates found", data: true });
  } else {
    res.send({ message: "Already up to date", data: false });
  }
});

module.exports = router

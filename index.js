const bodyParser = require("body-parser");
const express = require("express");
const pages = require("./lists/pageList.json");
const volumes = require("./lists/volumeList.json");
// const {fetchDates} = require("./src/dates");
// const { parseTitles } = require("./src/titles");
// const { collectVolumes } = require("./src/volumes");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ pages, volumes });
});

app.get("/check", (req, res) => {
  const { date } = req.query;
  const pageList = JSON.parse(pages);
  const pageIndex = pageList.findIndex((item) => item.date === date);
  console.log("pageIndex: " + pageIndex)
  if (pageIndex !== -1 && pageIndex + 1 < pageList.length) {
    const newDates = pageList.slice(pageIndex)
    console.log("new dates: " + newDates.toString());
    res.send({message: "New dates found", data: newDates})
  } else {
    res.send({message: "Already up to date"})
  }
});

app.listen(3123, () => {
  console.log("listening at port 3123");
});

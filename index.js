const bodyParser = require("body-parser");
const express = require("express");
const pages = require("./lists/pageList.json")
const volumes = require("./lists/volumeList.json")
// const {fetchDates} = require("./src/dates");
// const { parseTitles } = require("./src/titles");
// const { collectVolumes } = require("./src/volumes");
// collectVolumes()

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) =>{
    res.send({pages, volumes})
})

app.get("/check", (req, res) => {
    const {date} = req.params
    console.log(date)
})

app.listen(3123, () => {
  console.log("listening at port 3123");
});

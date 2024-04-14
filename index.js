const axios = require("axios");
const fs = require("node:fs/promises");

const getPage = async (date) => {
  const data = await axios.get(
    `http://www.girlgeniusonline.com/comic.php?date=${
      date != null ? date : "20021104"
    }`
  );
  return data;
};

// DATE COLLECTION FUNCTIONS

const getNextDate = async (date) => {
  const { data } = await getPage(date);
  const nextDate = data.indexOf("topnext");
  const dateString = data.substring(nextDate - 14, nextDate - 6);
  return dateString;
};

const fetchDates = async () => {
  const dates = ["20021104"]; // if date list is present, get last date
  const regex = new RegExp(/[\d]{8}/);
  while (regex.test(await getNextDate(dates[dates.length - 1]))) {
    const nextDate = await getNextDate(dates[dates.length - 1]);
    dates.push(nextDate);
    console.log(dates);
  }
  return dates;
};

// TITLE COLLECTION FUNCTIONS

const getTitles = async () => {
  const res = await getPage();
  const startIndex = res.data.indexOf("<option value='20021104'>");
  const endIndex = res.data.indexOf("---Jump to a Scene---<");
  const titles = res.data.substring(startIndex, endIndex);
  return titles;
};

const parseTitles = async () => {
  const res = await getTitles();
  //const regex = new RegExp(/^([a-zA-Z0-9>'():.\-\s]*)(<\/option>)/g);
  const regex = new RegExp(/^(.*)(<\/option>)/g);
  const list = res.split("<option value='");
  return list.map((item) => {
    //console.log(item)
    const date = item.substring(0, 8);
    const titleReg = item.match(regex);
    const matchedTitle = titleReg != null ? titleReg[0] : "";
    // console.log(matchedTitle)
    const titleStartIndex = matchedTitle.indexOf(">");
    const titleEndIndex = matchedTitle.indexOf("</option>");
    const title = matchedTitle.substring(titleStartIndex + 1, titleEndIndex);
    return { date: date, title: title };
  });
};

const getVolumeStarts = async () => {
  const titles = await parseTitles();
  const volumeStarts = titles.filter((item) =>
    item.title.includes("First Page")
  );
  return volumeStarts;
};
getVolumeStarts();

// PageType = {pageNumber: "number", date: "date", title: "title", volumeNumber: "number"}
// collect volume into {volumeStart: "date", volumeNumber: "number", pages: PageType[]}

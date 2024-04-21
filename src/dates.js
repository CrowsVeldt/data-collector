const FS = require("node:fs/promises");
const PATH = require("node:path")
const { getPage } = require("./network");
const dateList = require("../lists/dateList.json");

const getNextDate = async (date) => {
  const { data } = await getPage(date);
  const nextDate = data.indexOf("topnext");
  const dateString = data.substring(nextDate - 14, nextDate - 6);
  return dateString;
};

const fetchDates = async () => {
  const root = PATH.resolve("./")
  const dates = dateList.length > 0 ? dateList : ["20021104"];
  const regex = new RegExp(/[\d]{8}/);

  let nextDateExists = true;

  while (nextDateExists) {
    const nextDate = await getNextDate(dates[dates.length - 1]);
    if (regex.test(nextDate)) {
      dates.push(nextDate);
    } else {
      nextDateExists = false;
    }
    FS.writeFile(`${root}/lists/dateList.json`, JSON.stringify(dates));
  }
};

module.exports = { fetchDates };

const { getPage } = require("./network");
const fs = require("node:fs/promises");

const getNextDate = async (date) => {
  const { data } = await getPage(date);
  const nextDate = data.indexOf("topnext");
  const dateString = data.substring(nextDate - 14, nextDate - 6);
  return dateString;
};

const fetchDates = async () => {
  const dates = ["20021104"]; // if date list is present, get last date
  const regex = new RegExp(/[\d]{8}/);

  let nextDateExists = true;

  while (nextDateExists) {
    const nextDate = await getNextDate(dates[dates.length - 1]);
    console.log(nextDate);
    if (regex.test(nextDate)) {
      dates.push(nextDate);
    } else {
      nextDateExists = false;
    }
    fs.writeFile("dateList.json", JSON.stringify(dates));
  }
};

module.exports = { fetchDates };

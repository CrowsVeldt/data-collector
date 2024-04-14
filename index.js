const axios = require("axios");
const fs = require("node:fs/promises");

const getData = async (date) => {
  const data = await axios.get(
    `http://www.girlgeniusonline.com/comic.php?date=${
      date != null ? date : "20021104"
    }`
  );
  return data;
};

const getNextDate = async (date) => {
  const { data } = await getData(date);
  const nextDate = data.indexOf("topnext");
  const dateString = data.substring(nextDate - 14, nextDate - 6);
  return dateString;
};

const recordDates = async () => {
  const dates = ["20021104"]; // if date list is present, get last date
  const regex = new RegExp(/[\d]{8}/);
  while (regex.test(await getNextDate(dates[dates.length - 1]))) {
    const nextDate = await getNextDate(dates[dates.length - 1]);
    dates.push(nextDate);
    console.log(dates);
  }
  return dates;
};

recordDates()

// option value='20021104', for titles/volumes

const axios = require("axios");
const fs = require("node:fs/promises");

const getData = async (date) => {
  const data = await axios.get(
    `http://www.girlgeniusonline.com/comic.php?date=${date != null ? date : "20021104"}`
  );
  return data;
};

const getNextDate = async (res) => {
  const { data } = await res;
  const nextDate = data.indexOf("topnext");
  const dateString = data.substring(nextDate - 14, nextDate - 6);
  return dateString;
};

const getNextPage = async (date) => {
  const nextPageDate = await getNextDate(getData(date))
  const nextPage = await getData(nextPageDate)
  return nextPage;
};

const recordDates = async () => {
    const firstDate = "20021104"
    const nextDate = getNextDate(firstDate)
}

// getNextPage("20021106")


// option value='20021104', for titles/volumes

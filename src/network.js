const axios = require("axios");

const getPage = async (date) => {
  const data = await axios.get(
    `http://www.girlgeniusonline.com/comic.php?date=${
      date != null ? date : "20021104"
    }`
  );
  return data;
};

module.exports = {getPage};

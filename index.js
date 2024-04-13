const axios = require("axios");

const getData = async () => {
  const data = await axios.get(
    "http://www.girlgeniusonline.com/comic.php?date=20021104"
  );
  console.log(data);
  return data;
};

getData();

// div id=topnav, for dates

// option value='20021104', for titles/volumes

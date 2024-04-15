const { getPage } = require("./network");
const fs = require("node:fs/promises")

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
  // const listMap = 
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


module.exports = { parseTitles };

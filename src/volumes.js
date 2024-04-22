const FS = require("node:fs/promises");
const PATH = require("node:path")
const { parseTitles } = require("./titles");

const collectVolumes = async () => {
  const root = PATH.resolve("./")
  const pages = [];
  const parsedTitles = await parseTitles()
  const dates = await FS.readFile(`${root}/lists/dateList.json`, "utf8");
  const parsedDates = JSON.parse(dates);

  const volumeStarts = parsedTitles.filter((item) =>
    item.title.includes("First Page")
  );

  const volumeList = volumeStarts.map((item, volumeIndex) => {
    const lastDate =
      volumeStarts[volumeIndex + 1] != null
        ? volumeStarts[volumeIndex + 1].date
        : null

    const volumeDates = parsedDates.slice(
      parsedDates.indexOf(item.date),
      lastDate != null ? parsedDates.indexOf(lastDate) : parsedDates.length
    );

    const filteredTitles = parsedTitles.filter(
      (item) => !item.title.includes("First Page")
    );

    const volumePages = volumeDates.map((date, pageIndex) => {
      const title = filteredTitles.find((item) => item.date === date);

      const page = {
        pageNumber: pageIndex + 1,
        date: date,
        title: title != null ? title.title : "",
        volumeNumber: volumeIndex + 1,
      };
      pages.push(page);
      return page;
    });

    return {
      volumeStart: item.date,
      volumeNumber: volumeIndex + 1,
      pages: volumePages,
    };
  });

  FS.writeFile(`${root}/lists/pageList.json`, JSON.stringify(pages));
  FS.writeFile(`${root}/lists/volumeList.json`, JSON.stringify(volumeList));
};

module.exports = { collectVolumes };

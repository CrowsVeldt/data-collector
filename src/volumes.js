const fs = require("node:fs/promises");

const collectVolumes = async () => {
  const pages = [];
  const volumes = [];
  const titles = await fs.readFile("lists/titleList.json", "utf8");
  const parsedTitles = JSON.parse(titles);

  const dates = await fs.readFile("lists/dateList.json", "utf8");
  const parsedDates = JSON.parse(dates);

  const volumeStarts = parsedTitles.filter((item) =>
    item.title.includes("First Page")
  );

  const volumeList = volumeStarts.map((item, volumeIndex) => {
    const lastDate =
      volumeStarts[volumeIndex + 1] != null
        ? volumeStarts[volumeIndex + 1].date
        : "";

    const volumeDates = parsedDates.slice(
      parsedDates.indexOf(item.date),
      parsedDates.indexOf(lastDate)
    );

    const volumePages = volumeDates.map((date, pageIndex) => {
      const title = parsedTitles.find((item) => item.date === date);

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

  return {volumeList: volumeList, pageList: pages}
};

module.exports = { collectVolumes };

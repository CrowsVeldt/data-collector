// const { parseTitles } = require("./titles");
const fs = require("node:fs/promises");

// const getVolumeStarts = async () => {
//   const titles = await parseTitles();
//   const volumeStarts = titles.filter((item) =>
//     item.title.includes("First Page")
//   );
//   return volumeStarts;
// };

//collectVolumes => VolumeType[]
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

    // volumeDates = step over dates from ${Volume (A) Start} to ${Volume (B) Start - 1}
    const volumeDates = parsedDates.slice(
      parsedDates.indexOf(item.date),
      parsedDates.indexOf(lastDate)
    );

    const volumePages = volumeDates.map((date, pageIndex) => {
      // TODO : fix getting titles for each date
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

  console.log(volumeList[0])
};
// volumePages = volumeDates.map((date, index) => {
//  const page = {pageNumber: index, date: date, title: title, volumeNumber: (A)}
//  pages.push(page)
//  return page
// )}
// volumes.push({volumeStart: ${Volume (A) Start}, volumeNumber: (A), pages: volumePages})
// return [pages, volumes]
// PageType = {pageNumber: "number", date: "date", title: "title", volumeNumber: "number"}
// VolumeType = {volumeStart: "date", volumeNumber: "number", pages: PageType[]}

module.exports = { collectVolumes };

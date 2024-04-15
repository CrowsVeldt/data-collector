const {parseTitles} = require("./titles")

const getVolumeStarts = async () => {
  const titles = await parseTitles();
  const volumeStarts = titles.filter((item) =>
    item.title.includes("First Page")
  );
  return volumeStarts;
};

//collectVolumes => VolumeType[]
const collectVolumes = async () => {
  const pages = [];
  const volumes = [];

  // get dates here

  const volumeStarts = await getVolumeStarts();
  volumeStarts.map((item, index) => {
    const firstDate = item.date;
    const lastDate = volumeStarts[index + 1] != null ? volumeStarts[index + 1].date : "";
  });

  // volumeDates = step over dates from ${Volume (A) Start} to ${Volume (B) Start - 1}
  // volumePages = volumeDates.map((date, index) => {
  //  const page = {pageNumber: index, date: date, title: title, volumeNumber: (A)}
  //  pages.push(page)
  //  return page
  // )}
  // volumes.push({volumeStart: ${Volume (A) Start}, volumeNumber: (A), pages: volumePages})
  // return [pages, volumes]
};
// PageType = {pageNumber: "number", date: "date", title: "title", volumeNumber: "number"}
// VolumeType = {volumeStart: "date", volumeNumber: "number", pages: PageType[]}
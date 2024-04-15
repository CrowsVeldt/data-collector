const fs = require("node:fs/promises");

const writeFile = (title, data) => {
  try {
    fs.writeFile(title, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

const readFile = async (file) => {
  try {
    const fileContents = await fs.readFile(file, "utf8");
    const parsedContents = JSON.parse(fileContents);
    return parsedContents;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {readFile, writeFile}
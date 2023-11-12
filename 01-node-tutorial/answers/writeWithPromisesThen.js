const { writeFile, readFile } = require("fs").promises;

writeFile("temp.txt", "Hello this is 1 text line\n")
  .then(() => {
    return writeFile("temp.txt", "Hello this is 2 text line\n", { flag: "a" });
  })
  .then(() => {
    return writeFile("temp.txt", "Hello this is 3 text line\n", { flag: "a" });
  })
  .then(() => {
    return readFile("temp.txt", 'utf-8')
  })
  .then((content) => {
    console.log("File content:\n", content);
  })
  .catch((error) => {
    console.log("An error occurred: ", error);
  });

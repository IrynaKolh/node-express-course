const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  try {
    const first = "Hello this is first text line";
    const second = "Hello this is second text line";
    const third = "Hello this is third text line";

    await writeFile("temp.txt", `${first} ${second} ${third}`);
    console.log("File 'temp.txt' has been written.");
  } catch (error) {
    console.log("An error occurred: ", error);
  }
};

const reader = async () => {
  try {
    const content = await readFile("temp.txt", "utf8");
    console.log("File content:\n", content);
  } catch (error) {
    console.log("An error occurred: ", error);
  }
};

const readWrite = async () => {
  await writer();
  await reader();
};

readWrite();

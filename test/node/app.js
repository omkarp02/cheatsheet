const fs = require("fs");

const file = "text.txt";

function readFileCallback(err, data) {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File contents:", data.toString());
}

fs.readFile(file, readFileCallback);

for (let i = 0; i < 10_000_000_000; i++) {
  
}

setImmediate(() => console.log("setimmediate "))

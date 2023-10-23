var Jimp = require("jimp");
var path = require("path");
const fs = require("fs");

const FILES_FOLDER = path.join(__dirname, "files");
const OPTIMIZED_FOLDER = path.join(FILES_FOLDER, "optimized");

let existingOptimizedFiles = [];
fs.readdir(OPTIMIZED_FOLDER, (err, files) => {
  existingOptimizedFiles = files;
});

const changedFiles = {
  files: [],
  count: 0,
};
fs.readdir(FILES_FOLDER, (err, files) => {
  for (const file of files) {
    if (file.indexOf(".png") !== -1) {
      if (existingOptimizedFiles.indexOf(file.replace("png", "jpeg")) !== -1) {
        console.log("already optimized");
        continue;
      } else {
        changedFiles.count++;
        console.log("not optimized:", file);
        const newName = file.replace("png", "jpeg");
        Jimp.read(path.join(FILES_FOLDER, file))
          .then((img) => {
            return img
              .resize(640, Jimp.AUTO)
              .quality(75)
              .write(path.join(OPTIMIZED_FOLDER, newName));
          })
          .then(() => {
            console.log("optimized:", newName);
            changedFiles.files.push(newName);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }
  console.log("Optimized files count:", changedFiles.count);
  if (changedFiles.count === 0) {
    console.log("No files were optimized");
    return;
  } else {
    fs.writeFile(
      path.join(__dirname, "changedFiles.json"),
      JSON.stringify(changedFiles),
      function (err) {
        if (err) return console.log(err);
      }
    );
  }
});

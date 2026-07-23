"use strict";

const filesystem = require("./filesystem");
const newname = process.argv[2];

if (newname) {
  const content = filesystem.readPackageFile();
  const json = JSON.parse(content);
  json.name = newname;
  filesystem.savePackageFile(json);
  console.log(newname);
}

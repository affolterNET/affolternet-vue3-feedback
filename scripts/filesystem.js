"use strict";

const path = require('path');
const fs = require('fs');

const packagePath = path.resolve(__dirname, '..', './package.json');

function savePackageFile(json) {
  const content = JSON.stringify(json, null, 1);
  fs.writeFileSync(packagePath, content, 'utf-8');
}

function readPackageFile() {
  return fs.readFileSync(packagePath, 'utf-8');
}

module.exports = {
  savePackageFile,
  readPackageFile
};

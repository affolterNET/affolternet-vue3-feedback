 "use strict";

const filesystem = require('./filesystem');

const content = filesystem.readPackageFile();
const json = JSON.parse(content);
if (json.version) {
  const parts = json.version.split('.');
  if (parts.length === 3) {
    const last = parts.length -1;
    const patch = parseInt(parts[last]);
    if (!isNaN(patch)) {
      parts[last] = (patch + 1).toString();
      json.version = parts.join('.');
      filesystem.savePackageFile(json);
      console.log(json.version);
    }
  }
}

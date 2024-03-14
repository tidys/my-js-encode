var lib = require("jsfuck");
const { join } = require("path")
const { readFileSync, writeFileSync } = require("fs");
var data = readFileSync(join(__dirname, './1.js'), "utf8");
var output = lib.JSFuck.encode(data, false);
 
writeFileSync(join(__dirname, './1.en.js'), output, "utf8");

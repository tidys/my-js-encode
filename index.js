var lib = require("jsfuck");
const { join } = require("path")
const { readFileSync, writeFileSync } = require("fs");


function fuck(data) {
    const output = lib.JSFuck.encode(data, false);
    return output;
}

function obf(data) {
    const JavaScriptObfuscator = require('javascript-obfuscator');
    const obfuscationResult = JavaScriptObfuscator.obfuscate(data, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1
    });
    const encode = obfuscationResult.getObfuscatedCode();
    return encode;
}
function main(file) {
    let data = readFileSync(join(__dirname, `./${file}.js`), "utf8");
    data = obf(data);
    data = obf(data);
    // data = fuck(data);
    writeFileSync(join(__dirname, `./${file}.en.js`), data, "utf8");
}
main('1');

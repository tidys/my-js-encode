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
function main(url, dest) {
    (async function () {
        const globby = require('globby');
        const files = await globby([url]);
        if (!files.length) {
            console.log(`no find files :${url}`)
            return;
        }
        const file = files[0];
        console.log('find file: ', file);
        let data = readFileSync(file, "utf8");
        data = obf(data);
        data = obf(data);
        // data = fuck(data);
        writeFileSync(dest || file, data, "utf8");
        console.log('encode success!')
    })();
}
let file = "";
file = 'E:/proj-cocos/spine-340/build/web-mobile/assets/main/index.*.js';
file = 'E:/proj-cocos/dragon-bones/build/web-mobile/2.4.10/assets/main/index.*.js'
// file = join(__dirname, `./${file}.js`)
main(file);

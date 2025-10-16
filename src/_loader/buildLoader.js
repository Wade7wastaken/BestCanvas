import { readFileSync, writeFileSync } from "node:fs";

import { minify } from "uglify-js";

/** @type {import("uglify-js").MinifyOptions} */
const config = {
    module: true,
    toplevel: true,
    mangle: {
        toplevel: true,
        eval: true,
    },
    compress: {
        passes: 10,
    },
};

const code = readFileSync("./src/_loader/loader.js").toString("utf8");

const minified = minify(code, config);

writeFileSync("./dist/loader.js", minified.code);

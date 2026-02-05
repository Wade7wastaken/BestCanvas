import path from "node:path";
import { fileURLToPath } from "node:url";

import webpack from "webpack";

const header = `// ==UserScript==
// @name         On Canvas Plus
// @namespace    http://tampermonkey.net/
// @version      2025-10-03
// @description  Shows grade changes on the courses pages. Requires BetterCanvas.
// @author       David Callender
// @include      /^https:\\/\\/canvas\\.[^\\/]+\\.edu\\/.*/
// @grant        none
// ==/UserScript==
`;

/** @type {import('webpack').Configuration} */
const config = {
    mode: "development",
    devtool: false,
    entry: "./src/main.ts",
    output: {
        path: path.resolve(
            path.dirname(fileURLToPath(import.meta.url)),
            "dist"
        ),
        filename: "bundle.js",
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: header,
            stage: webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
            raw: true,
            entryOnly: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts(x)?$/i,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.svg$/i,
                loader: "svg-url-loader",
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts"],
    },
};

export default config;

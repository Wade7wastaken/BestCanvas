import path from "node:path";
import { fileURLToPath } from "node:url";

import webpack from "webpack";

/**
 * Generates the Tampermonkey header to append to the top of the bundle.
 * @returns {string}
 */
const generateHeader = () => {
    const today = new Date();
    const version = `${today.getUTCFullYear()}.${today.getUTCMonth() + 1}.${today.getUTCDate()}.${today.getUTCHours()}.${today.getUTCMinutes()}.${today.getUTCSeconds()}`;
    return String.raw`// ==UserScript==
// @name         BestCanvas
// @namespace    http://tampermonkey.net/
// @version      ${version}
// @description  Shows grade changes on the courses pages and adds hotkeys. Requires BetterCanvas.
// @source       https://github.com/Wade7wastaken/BestCanvas
// @author       David Callender
// @include      /^https:\/\/canvas\.[^\/]+\.edu\/.*/
// @grant        none
// ==/UserScript==`;
};

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
            banner: generateHeader(),
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

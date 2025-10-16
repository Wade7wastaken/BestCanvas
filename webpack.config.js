import path from "node:path";
import { fileURLToPath } from "node:url";

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

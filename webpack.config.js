import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('webpack').Configuration} */
const config = {
	mode: "production",
	devtool: false,
	entry: "./src/index.ts",
	output: {
		path: resolve(dirname(fileURLToPath(import.meta.url)), "dist"),
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.ts(x)?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.html$/,
				use: ["html-loader"],
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
};

export default config;

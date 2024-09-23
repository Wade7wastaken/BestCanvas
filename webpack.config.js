import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('webpack').Configuration} */
const config = {
	mode: "development",
	devtool: false,
	entry: "./src/index.ts",
	output: {
		path: resolve(dirname(fileURLToPath(import.meta.url)), "dist"),
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
				test: /\.css$/i,
				use: ["to-string-loader", "css-loader"],
			},
			{
				test: /\.s[ac]ss$/i,
				use: ["to-string-loader", "css-loader", "sass-loader"],
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
		extensions: [".tsx", ".ts", ".js"],
	},
};

export default config;

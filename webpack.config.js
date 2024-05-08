const path = require("path");
const webpack = require("webpack");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: "./src/main/client.js",
  mode: process.env.NODE_ENV || "development",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new NodePolyfillPlugin()
  ],
  resolve: {
    fallback: {
        "fs": false,
        "util": false
    },
  }
};

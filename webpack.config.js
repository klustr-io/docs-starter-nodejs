const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

let isDev = true;

module.exports = {
  name: "client",
  entry: isDev
    ? ["webpack-hot-middleware/client?reload=true", "./src/main/client.js"]
    : "./src/main/client.js",
  mode: "development",
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src/main"),
      "@console": path.resolve(__dirname, "views"),
      "@apis": path.resolve(__dirname, "views/apis"),
      "@components": path.resolve(__dirname, "views/components"),
      "@context": path.resolve(__dirname, "views/context"),
      "@layouts": path.resolve(__dirname, "views/layouts"),
      "@pages": path.resolve(__dirname, "views/pages"),
    },
    extensions: [".js", ".jsx", ".json"], // Ensure you include the file extensions you use
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  optimization: {
    minimize: !isDev,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
        },
      }),
    ],
  },
  plugins: [...(isDev ? [new webpack.HotModuleReplacementPlugin()] : [])],
};

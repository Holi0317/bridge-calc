const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const env = require("./webpack-cfg/env");
const typescript = require("./webpack-cfg/typescript");
const htmlLoader = require("./webpack-cfg/html-loader");
const postCssLoader = require("./webpack-cfg/postcss");
const fontsImagesLoader = require("./webpack-cfg/fonts-images-loader");
const genIndex = require("./webpack-cfg/gen-index");
const copyFiles = require("./webpack-cfg/copy-files");
const babelMinify = require("./webpack-cfg/babel-minify");
const analyzer = require("./webpack-cfg/analyzer");
const alias = require("./webpack-cfg/alias");
const scopeHoisting = require("./webpack-cfg/scope-hoisting");
const workbox = require("./webpack-cfg/workbox");
const splitChunks = require("./webpack-cfg/split-chunks");

const { ENV } = require("./webpack-cfg/paths");

module.exports = merge.smart(
  {
    entry: "./src/index",
    output: {
      path: path.resolve(__dirname, "dist")
    },
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require("./package.json").version)
      })
    ]
  },

  env,
  alias,
  splitChunks,

  typescript,
  htmlLoader,
  postCssLoader,
  fontsImagesLoader,

  genIndex,
  copyFiles,
  analyzer,

  ...(ENV === "production" ? [scopeHoisting, babelMinify, workbox] : [])
);

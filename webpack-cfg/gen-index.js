const HtmlWebpackPlugin = require("html-webpack-plugin");
const { transform } = require("@babel/core");
const { ENV } = require("./paths");

const babelOpt = {
  babelrc: false,
  comments: false,
  filename: "index.html",
  minified: true,
  presets: ["minify"]
};

const htmlSettings = {
  template: "assets/index.ejs",
  chunksSortMode: "dependency",
  minify:
    ENV === "production"
      ? {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS(code) {
            return transform(code, babelOpt).code;
          }
        }
      : undefined
};

module.exports = {
  plugins: [new HtmlWebpackPlugin(htmlSettings)]
};

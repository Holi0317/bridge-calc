const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ENV } = require("./paths");

const htmlSettings = {
  template: "assets/index.ejs",
  chunksSortMode: "dependency",
  minify:
    ENV === "production"
      ? {
          removeComments: true,
          collapseWhitespace: true
        }
      : undefined
};

module.exports = {
  plugins: [new HtmlWebpackPlugin(htmlSettings)]
};

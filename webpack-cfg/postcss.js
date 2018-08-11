const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ENV } = require("./paths");

const cssLoader = {
  loader: "css-loader",
  options: {
    modules: true,
    sourceMap: true,
    importLoaders: 1,
    minimize: ENV === "production",
    localIdentName:
      ENV === "production"
        ? "[hash:base64:5]"
        : "[name]__[local]--[hash:base64:5]",
    camelCase: "dashesOnly"
  }
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.pcss$/,
        use: [MiniCssExtractPlugin.loader, cssLoader, "postcss-loader"]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        // This magically solves class name collision in CSS module
        context: __dirname
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.p?css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  }
};

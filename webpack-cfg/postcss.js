const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ENV } = require("./paths");

const cssLoader = {
  loader: "css-loader",
  options: {
    sourceMap: true,
    importLoaders: 1,
    modules: {
      localIdentName:
        ENV === "production"
          ? "[hash:base64:5]"
          : "[name]__[local]--[hash:base64:5]"
    },
    localsConvention: "dashesOnly"
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

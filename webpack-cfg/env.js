const WebpackMd5Hash = require("webpack-md5-hash");
const webpack = require("webpack");
const { ENV } = require("./paths");
const pkg = require("../package.json");

const commitHash = require("child_process")
  .execSync("git rev-parse --short HEAD")
  .toString();

const definePlugin = new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify(ENV),
  VERSION: JSON.stringify(pkg.version),
  HASH: JSON.stringify(commitHash)
});

const productionEnv = {
  output: {
    filename: "[name].[chunkhash].bundle.js",
    sourceMapFilename: "[name].[chunkhash].bundle.map",
    chunkFilename: "[name].[chunkhash].chunk.js"
  },

  plugins: [
    new WebpackMd5Hash(),
    new webpack.LoaderOptionsPlugin({
      options: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true
      }
    }),

    definePlugin
  ]
};

const developmentEnv = {
  devtool: "inline-source-map",
  output: {
    filename: "[name].bundle.js",
    sourceMapFilename: "[name].bundle.map",
    chunkFilename: "[name].chunk.js"
  },
  devServer: {
    port: 9000,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },
  plugins: [definePlugin]
};

module.exports =
  ENV === "test" || ENV === "development" ? developmentEnv : productionEnv;

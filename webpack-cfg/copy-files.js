const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    new CopyWebpackPlugin([
      { from: "assets/favicon.ico", to: "favicon.ico" },
      { from: "assets/manifest.json", to: "manifest.json" },
      { from: "assets/icons", to: "icons" }
    ])
  ]
};

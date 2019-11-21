const { DefinePlugin } = require("webpack");
const {
  override,
  useBabelRc,
  addBundleVisualizer,
  addWebpackAlias,
  addWebpackPlugin
} = require("customize-cra");
const pkg = require("./package.json");

const commitHash = require("child_process")
  .execSync("git rev-parse --short HEAD")
  .toString();

const definePlugin = new DefinePlugin({
  VERSION: JSON.stringify(pkg.version),
  HASH: JSON.stringify(commitHash)
});

module.exports = override(
  useBabelRc(),
  process.env.NODE_ENV === "production" && addBundleVisualizer(),
  addWebpackAlias({ lodash: "lodash-es" }),
  addWebpackPlugin(definePlugin)
);

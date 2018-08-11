const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { ENV } = require("./paths");

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      // Replace `disabled` to `server` to produce analyze in development environment
      analyzerMode: ENV === "production" ? "static" : "disabled",
      analyzerPort: 9001,
      reportFilename: "report.html",
      openAnalyzer: false
    })
  ]
};

const MinifyPlugin = require('babel-minify-webpack-plugin')

module.exports = {
  plugins: [
    new MinifyPlugin({
      removeConsole: true,
      removeDebugger: true
    })
  ]
}

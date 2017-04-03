const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  plugins: [
    new CopyWebpackPlugin([
      {from: 'favicon.ico', to: 'favicon.ico'},
      {from: 'manifest.json', to: 'manifest.json'}
    ])
  ]
}

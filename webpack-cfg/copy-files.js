const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  plugins: [
    new CopyWebpackPlugin([
      {from: 'favicon.ico', to: 'favicon.ico'}
    ])
  ]
}

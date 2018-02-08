const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
      // This magically solves class name collision in CSS module
        context: __dirname
      }
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    })
  ]
}

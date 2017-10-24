const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname // This magically solves class name collision in CSS module
      }
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    })
  ]
}

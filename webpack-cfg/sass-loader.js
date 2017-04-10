const ExtractTextPlugin = require('extract-text-webpack-plugin')
const {ENV} = require('./paths')

const cssLoader = {
  loader: 'css-loader',
  options: {
    minimize: ENV === 'production'
  }
}

const sassLoader = {
  loader: 'sass-loader'
}

module.exports = {
  module: {
    rules: [{
      test: /\.(scss|sass)$/i,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [cssLoader, sassLoader]
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    })
  ]
}

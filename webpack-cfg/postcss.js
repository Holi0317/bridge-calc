const ExtractTextPlugin = require('extract-text-webpack-plugin')
const {ENV} = require('./paths')

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    importLoaders: 1,
    minimize: ENV === 'production'
  }
}

module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [cssLoader, 'postcss-loader']
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

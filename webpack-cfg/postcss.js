const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    importLoaders: 1,
    minimize: false,
    localIdentName: '[hash:base64:5]',
    camelCase: 'dashesOnly'
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
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname  // This magically solves class name collision in CSS module
      }
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    })
  ]
}

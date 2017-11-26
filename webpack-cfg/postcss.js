const ExtractTextPlugin = require('extract-text-webpack-plugin')
const {ENV} = require('./paths')

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    importLoaders: 1,
    minimize: ENV === 'production',
    localIdentName: '[hash:base64:5]',
    camelCase: 'dashesOnly'
  }
}

module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      exclude: /flexboxgrid/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [cssLoader, 'postcss-loader']
      })
    }]
  }
}

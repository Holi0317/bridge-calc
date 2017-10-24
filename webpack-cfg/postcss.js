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

const flexCssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    minimize: ENV === 'production',
    localIdentName: '[hash:base64:5]'
  }
}

module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [cssLoader, 'postcss-loader']
      })
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: flexCssLoader
      }),
      include: /flexboxgrid/
    }]
  }
}

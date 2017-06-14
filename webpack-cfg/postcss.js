const webpack = require('webpack')
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

const globalCssLoader = Object.assign({}, cssLoader, {
  options: Object.assign({}, cssLoader.options, {
    modules: false
  })
})

module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      exclude: /\.global\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [cssLoader, 'postcss-loader']
      })
    }, {
      test: /\.global\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [globalCssLoader, 'postcss-loader']
      })
    }]
  },
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

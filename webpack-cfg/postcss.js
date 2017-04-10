const ExtractTextPlugin = require('extract-text-webpack-plugin')
const {ENV} = require('./paths')
const path = require('path')

// This file will be required without css-modules
const globalStyles = path.resolve('styles/styles.css')

function getRule(enableModules) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: enableModules,
      sourceMap: true,
      importLoaders: 1,
      minimize: ENV === 'production'
    }
  }
  return {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [cssLoader, 'postcss-loader']
    })
  }
}

module.exports = {
  module: {
    rules: [
      Object.assign({}, getRule(true), { exclude: globalStyles }),
      Object.assign({}, getRule(false), { include: globalStyles }),
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    })
  ]
}

const HtmlWebpackPlugin = require('html-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const {transform} = require('babel-core')
const {ENV} = require('./paths')

const babelOpt = {
  babelrc: false,
  comments: false,
  filename: 'index.html',
  minified: true,
  presets: ['minify']
}

const htmlSettings = {
  template: 'index.ejs',
  chunksSortMode: 'dependency',
  minify: (ENV === 'production') ? {
    removeComments: true,
    collapseWhitespace: true,
    minifyJS(code) {
      return transform(code, babelOpt).code
    }
  } : undefined
}

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(htmlSettings),
    new PreloadWebpackPlugin({
      rel: 'prefetch' // Prefetch resources likely to be used for future navigations
    })
  ]
}

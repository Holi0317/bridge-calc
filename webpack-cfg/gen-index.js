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

    // Tl;dr: prefetch has lower priority than preload
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: ['main', 'vendor']
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      include: 'asyncChunks'
    })
  ]
}

const HtmlWebpackPlugin = require('html-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const {ENV} = require('./paths')

const htmlSettings = {
  template: 'index.ejs',
  chunksSortMode: 'dependency',
  minify: (ENV === 'production') ? {
    removeComments: true,
    collapseWhitespace: true
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

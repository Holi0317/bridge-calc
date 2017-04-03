const HtmlWebpackPlugin = require('html-webpack-plugin')
const {ENV} = require('./paths')

const htmlSettings = {
  template: 'index.ejs',
  chunksSortMode: 'dependency',
  minify: (ENV === 'production') ? {
    removeComments: true,
    collapseWhitespace: true
  } : undefined,
  baseUrl: '/'
}

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(htmlSettings),
    new HtmlWebpackPlugin(Object.assign({}, htmlSettings, {
      filename: '404.html'
    }))
  ]
}

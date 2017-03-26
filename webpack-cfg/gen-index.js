const HtmlWebpackPlugin = require('html-webpack-plugin')
const {ENV} = require('./paths')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      chunksSortMode: 'dependency',
      minify: (ENV === 'production') ? {
        removeComments: true,
        collapseWhitespace: true
      } : undefined,
      baseUrl: '/'
    }),
  ]
}

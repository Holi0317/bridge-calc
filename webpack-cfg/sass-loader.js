const ExtractTextPlugin = require('extract-text-webpack-plugin')
const {ENV} = require('./paths')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {minimize: ENV === 'production'}
            },
            'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    })
  ]
}

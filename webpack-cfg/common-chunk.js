const webpack = require('webpack')

const regex = /lodash|material-ui|react-dom/

module.exports = {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash].js',
      minChunks: module => (
        module.context && regex.test(module.context)
      )
    })
  ]
}

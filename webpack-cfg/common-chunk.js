const webpack = require('webpack')

const regex = /lodash|material-ui|react-dom/

module.exports = {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => (
        module.resource && regex.test(module.resource)
      )
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      minChunks: 3
    })
  ]
}

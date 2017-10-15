const webpack = require('webpack')

const regex = /lodash|material-ui/

module.exports = {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      minChunks: (module, count) => (
        module.resource && regex.test(module.resource) && count >= 3
      )
    })
  ]
}

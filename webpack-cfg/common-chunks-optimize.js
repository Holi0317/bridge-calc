const webpack = require('webpack')
const paths = require('./paths')

const appChunkName = 'app'
const firstChunk = 'aurelia-bootstrap'

module.exports = {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: [
        firstChunk,
        ...Object.keys(paths.entry || {}).filter(entry => entry !== appChunkName && entry !== firstChunk)
      ].reverse()
    })
  ]
}

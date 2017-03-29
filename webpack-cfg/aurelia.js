const path = require('path')
const {AureliaPlugin} = require('aurelia-webpack-plugin')

module.exports = {
  resolve: {
    modules: ['src', 'node_modules'].map(x => path.resolve(x))
  },
  plugins: [
    new AureliaPlugin({

    })
  ]
}

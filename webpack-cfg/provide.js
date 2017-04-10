const {ProvidePlugin} = require('webpack')
const path = require('path')

module.exports = {
  resolve: {
    modules: [path.resolve('src/lib'), 'node_modules']
  },
  plugins: [
    new ProvidePlugin({
      h: 'h-provider'
    })
  ]
}

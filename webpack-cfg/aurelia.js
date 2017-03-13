const path = require('path')
const AureliaPlugin = require('aurelia-webpack-plugin')

module.exports = {
  resolve: {
    modules: [path.resolve('src'), 'node_modules']
  },
  plugins: [
    new AureliaPlugin({
      root: path.resolve(__dirname, '..'),
      src: path.resolve(__dirname, '../src'),
      title: 'Bridge calculator',
      baseUrl: '/'
    })
  ]
}

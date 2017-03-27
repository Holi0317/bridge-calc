const {TsConfigPathsPlugin, CheckerPlugin} = require('awesome-typescript-loader')
const {ENV} = require('./paths')

const options = (ENV === 'test') ? {
  options: {
    doTypeCheck: false,
    sourceMap: false,
    inlineSourceMap: true,
    inlineSources: true
  }
} : {}

module.exports = {
  resolve: {
    extensions: ['.js', '.tsx', '.ts']
  },
  module: {
    rules: [{
      test: /\.[t|j]sx?$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/,
      options
    }]
  },
  plugins: [
    new TsConfigPathsPlugin(options),
    new CheckerPlugin()
  ]
}

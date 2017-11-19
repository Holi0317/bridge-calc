const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const {ENV} = require('./paths')

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: ENV === 'production' ? 'static' : 'server',
      analyzerPort: 9001,
      reportFilename: 'report.html',
      openAnalyzer: false
    })
  ]
}

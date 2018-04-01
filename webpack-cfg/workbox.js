const {GenerateSW} = require('workbox-webpack-plugin')

module.exports = {
  plugins: [
    new GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,

      exclude: ['report.html', '404.html', 'sw.js', 'service-worker.js'],
      navigateFallback: '/index.html',
      navigateFallbackBlacklist: [/report.html/]
    })
  ]
}

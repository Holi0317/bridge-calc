const path = require('path')
const WorkboxPlugin = require('workbox-webpack-plugin')

const DIST_DIR = 'dist'

module.exports = {
  plugins: [
    new WorkboxPlugin({
      globDirectory: DIST_DIR,
      globPatterns: ['**/*.{html,js,css}'],
      globIgnores: ['report.html', '404.html', 'sw.js', 'service-worker.js'],
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      navigateFallback: '/index.html',
      skipWaiting: true,
      swDest: path.join(DIST_DIR, 'sw.js')
    })
  ]
}

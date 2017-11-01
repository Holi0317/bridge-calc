const path = require('path')
const WorkboxPlugin = require('workbox-webpack-plugin')

const DIST_DIR = 'dist'

module.exports = {
  plugins: [
    new WorkboxPlugin({
      globDirectory: DIST_DIR,
      globPatterns: ['**/*.{html,js,css}'],
      globIgnores: ['report.html', '404.html'],
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      navigateFallback: '/',
      skipWaiting: true,
      swDest: path.join(DIST_DIR, 'sw.js'),
      runtimeCaching: [{
        urlPattern: 'https://fonts.googleapis.com/(.*)',
        handler: 'cacheFirst',
        options: {
          cacheName: 'googleapis',
          cacheExpiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60 // One month
          },
          cacheableResponse: {statuses: [0, 200]}
        }
      }]
    })
  ]
}

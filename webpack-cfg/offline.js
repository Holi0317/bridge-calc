const OfflinePlugin = require('offline-plugin')

module.exports = {
  plugins: [
    new OfflinePlugin({
      AppCache: false, // SW is the one and only one way to serve offline.
      ServiceWorker: {
        navigateFallbackURL: '/',
        minify: true,
        events: true
      }
    })
  ]
}

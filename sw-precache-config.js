module.exports = {
  staticFileGlobs: [
    '/index.html',
    '/manifest.json',
    '/bower_components/webcomponentsjs/webcomponents-lite.min.js',
    '/images/icon-32.png'
  ],
  navigateFallback: '/index.html',
  runtimeCaching: [{
    urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css.*/,
    handler: 'cacheFirst'
  }, {
    urlPattern: /^https?:\/\/fonts\.gstatic\.com/,
    handler: 'cacheFirst'
  }]
};

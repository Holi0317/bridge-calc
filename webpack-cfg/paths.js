module.exports.ENV = (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase()) || (process.env.NODE_ENV = 'development')

const bundles = {
  bootstrap: [
    'aurelia-bootstrapper-webpack',
    'aurelia-pal',
    'aurelia-pal-browser'
  ],
  // these will be included in the 'aurelia' bundle (except for the above bootstrap packages)
  aurelia: [
    'aurelia-bootstrapper-webpack',
    'aurelia-binding',
    'aurelia-dependency-injection',
    'aurelia-event-aggregator',
    'aurelia-framework',
    'aurelia-history',
    'aurelia-history-browser',
    'aurelia-loader',
    'aurelia-loader-webpack',
    'aurelia-logging',
    'aurelia-logging-console',
    'aurelia-metadata',
    'aurelia-pal',
    'aurelia-pal-browser',
    'aurelia-path',
    'aurelia-route-recognizer',
    'aurelia-router',
    'aurelia-task-queue',
    'aurelia-templating',
    'aurelia-templating-binding',
    'aurelia-templating-router',
    'aurelia-templating-resources',
    'aurelia-mdl-plugin',
    'material-design-lite/material'
  ],
  polyfills: [
    'whatwg-fetch'
  ]
}

module.exports.bundles = bundles

module.exports.entry = {
  app: ['./src/main'],
  'aurelia-bootstrap': bundles.bootstrap,
  aurelia: bundles.aurelia.filter(pkg => bundles.bootstrap.indexOf(pkg) === -1),
  polyfills: bundles.polyfills
}

/**
 * To learn more about how to use Easy Webpack
 * Take a look at the README here: https://github.com/easy-webpack/core
 **/
const { generateConfig, /* get, */ stripMetadata, /* EasyWebpackConfig */ } = require('@easy-webpack/core');
const path = require('path');
const webpack = require('webpack');
const envProd = require('@easy-webpack/config-env-production');
const envDev = require('@easy-webpack/config-env-development');
const aurelia = require('@easy-webpack/config-aurelia');
const babel = require('@easy-webpack/config-babel');
const html = require('@easy-webpack/config-html');
const sass = require('@easy-webpack/config-sass');
const fontAndImages = require('@easy-webpack/config-fonts-and-images');
const generateIndexHtml = require('@easy-webpack/config-generate-index-html');
const commonChunksOptimize = require('@easy-webpack/config-common-chunks-simple');
const copyFiles = require('@easy-webpack/config-copy-files');
const generateCoverage = require('@easy-webpack/config-test-coverage-istanbul');

const BabiliPlugin = require('babili-webpack-plugin');

const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || (process.env.NODE_ENV = 'development');

// basic configuration:
const title = 'Bridge calculator';
const baseUrl = '/';
const rootDir = path.resolve();
const srcDir = path.resolve('src');
const outDir = path.resolve('dist');

const coreBundles = {
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
};

const minificationConfig = {
  plugins: [
    new BabiliPlugin({
      comments: false
    })
  ]
};

/**
 * Main Webpack Configuration
 */
let config = generateConfig(
  {
    entry: {
      'app': ['./src/main' /* this is filled by the aurelia-webpack-plugin */],
      'aurelia-bootstrap': coreBundles.bootstrap,
      'aurelia': coreBundles.aurelia.filter(pkg => coreBundles.bootstrap.indexOf(pkg) === -1),
      'polyfills': coreBundles.polyfills
    },
    output: {
      path: outDir
    },
    watchOptions: {
      ignored: /node_modules/
    },
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require('./package.json').version)
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: ENV === 'production',
        options: {
          sassLoader: {
            includePaths: [path.resolve('./node_modules/material-design-lite/src')]
          }
        }
      })
    ]
  },

  ENV === 'test' || ENV === 'development' ?
    envDev(ENV !== 'test' ? {} : {devtool: 'inline-source-map'}) :
    envProd({ devtool: false }),

  aurelia({root: rootDir, src: srcDir, title: title, baseUrl: baseUrl}),

  babel({ options: { /* uses settings from .babelrc */ } }),
  html(),
  sass({
    filename: 'styles.css',
    allChunks: true,
    // sass loader cannot generate sourcemap on webpack 2 YET
    // sourceMap: ENV !== 'production'
    sourceMap: false
  }),
  fontAndImages(),
  generateIndexHtml({minify: ENV === 'production'}),

  ...(ENV === 'production' || ENV === 'development' ? [
    commonChunksOptimize({appChunkName: 'app', firstChunk: 'aurelia-bootstrap'}),
    copyFiles({patterns: [{ from: 'favicon.ico', to: 'favicon.ico' }]})
  ] : [
    /* ENV === 'test' */
    generateCoverage({ options: { 'force-sourcemap': true, esModules: true }})
  ]),

  ...(ENV === 'production'
      ? [minificationConfig]
      : []
  )

);

module.exports = stripMetadata(config);
